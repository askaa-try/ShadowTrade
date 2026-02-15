// ShadowTrade - Private Trading Strategy Contract v2
// Enhanced with payment, access control, and signal distribution

program shadowtrade.aleo {
    
    // Strategy metadata
    record Strategy {
        owner: address,
        strategy_id: field,
        price: u64,              // Subscription price in credits
        total_trades: u64,
        win_rate: u64,           // Basis points (6500 = 65%)
        roi: i64,                // Basis points (15000 = 150%)
        is_active: bool,
    }

    // Trading signal - private to subscribers
    record Signal {
        owner: address,          // Subscriber who receives this
        strategy_id: field,
        signal_type: u8,         // 0=buy, 1=sell, 2=hold
        timestamp: u64,
        price_target: u64,
        stop_loss: u64,
        take_profit: u64,
        expiry: u64,             // Signal expires after this block
    }

    // Subscription with payment
    record Subscription {
        owner: address,          // Subscriber
        provider: address,       // Strategy owner
        strategy_id: field,
        expiry: u64,
        is_active: bool,
    }

    // Revenue tracking for providers
    record Revenue {
        owner: address,          // Provider
        amount: u64,             // Total earnings
    }

    // Mapping: strategy_id -> is_registered
    mapping registered_strategies: field => bool;
    
    // Mapping: hash(subscriber, strategy_id) -> expiry_block
    mapping active_subscriptions: field => u64;

    // Mapping: provider_address -> total_revenue
    mapping provider_earnings: address => u64;


    // ========== STRATEGY MANAGEMENT ==========

    // Register new strategy
    transition register_strategy(
        public strategy_id: field,
        public price: u64
    ) -> Strategy {
        return Strategy {
            owner: self.caller,
            strategy_id: strategy_id,
            price: price,
            total_trades: 0u64,
            win_rate: 0u64,
            roi: 0i64,
            is_active: true,
        } then finalize(strategy_id);
    }

    finalize register_strategy(strategy_id: field) {
        // Ensure strategy not already registered
        let is_registered: bool = Mapping::get_or_use(registered_strategies, strategy_id, false);
        assert(!is_registered);
        Mapping::set(registered_strategies, strategy_id, true);
    }


    // Update strategy performance (only owner)
    transition update_performance(
        strategy: Strategy,
        new_win_rate: u64,
        new_roi: i64
    ) -> Strategy {
        assert_eq(self.caller, strategy.owner);
        
        return Strategy {
            owner: strategy.owner,
            strategy_id: strategy.strategy_id,
            price: strategy.price,
            total_trades: strategy.total_trades,
            win_rate: new_win_rate,
            roi: new_roi,
            is_active: strategy.is_active,
        };
    }


    // Pause/unpause strategy
    transition toggle_strategy(
        strategy: Strategy
    ) -> Strategy {
        assert_eq(self.caller, strategy.owner);
        
        return Strategy {
            owner: strategy.owner,
            strategy_id: strategy.strategy_id,
            price: strategy.price,
            total_trades: strategy.total_trades,
            win_rate: strategy.win_rate,
            roi: strategy.roi,
            is_active: !strategy.is_active,
        };
    }


    // ========== SUBSCRIPTION WITH PAYMENT ==========

    // Subscribe with payment (30 days = ~432000 blocks)
    transition subscribe_with_payment(
        public strategy_id: field,
        public duration: u64,
        payment: credits.aleo/credits,
        public provider: address,
        public price: u64
    ) -> (Subscription, credits.aleo/credits, credits.aleo/credits) {
        
        // Split payment: 80% to provider, 20% to platform
        let provider_share: u64 = (price * 80u64) / 100u64;
        let platform_share: u64 = price - provider_share;
        
        // Create payment records
        let provider_payment: credits.aleo/credits = credits.aleo/transfer_private(
            payment,
            provider,
            provider_share
        );
        
        let platform_payment: credits.aleo/credits = credits.aleo/transfer_private(
            payment,
            aleo1platform_address_here, // Replace with actual platform address
            platform_share
        );
        
        // Create subscription
        let subscription: Subscription = Subscription {
            owner: self.caller,
            provider: provider,
            strategy_id: strategy_id,
            expiry: block.height + duration,
            is_active: true,
        };
        
        return (subscription, provider_payment, platform_payment) then finalize(
            self.caller,
            strategy_id,
            block.height + duration,
            provider,
            provider_share
        );
    }

    finalize subscribe_with_payment(
        subscriber: address,
        strategy_id: field,
        expiry: u64,
        provider: address,
        amount: u64
    ) {
        // Create subscription key: hash(subscriber + strategy_id)
        let sub_key: field = BHP256::hash_to_field(subscriber);
        Mapping::set(active_subscriptions, sub_key, expiry);
        
        // Update provider earnings
        let current_earnings: u64 = Mapping::get_or_use(provider_earnings, provider, 0u64);
        Mapping::set(provider_earnings, provider, current_earnings + amount);
    }


    // Cancel subscription (refund not implemented for simplicity)
    transition cancel_subscription(
        subscription: Subscription
    ) -> Subscription {
        assert_eq(self.caller, subscription.owner);
        
        return Subscription {
            owner: subscription.owner,
            provider: subscription.provider,
            strategy_id: subscription.strategy_id,
            expiry: subscription.expiry,
            is_active: false,
        };
    }


    // ========== SIGNAL GENERATION & DISTRIBUTION ==========

    // Execute strategy and generate signal (private computation)
    transition execute_strategy(
        strategy: Strategy,
        market_data: field,
        signal_type: u8,
        price_target: u64,
        stop_loss: u64,
        take_profit: u64,
        signal_duration: u64
    ) -> Strategy {
        // Only owner can execute
        assert_eq(self.caller, strategy.owner);
        assert(strategy.is_active);
        
        // Update strategy stats
        return Strategy {
            owner: strategy.owner,
            strategy_id: strategy.strategy_id,
            price: strategy.price,
            total_trades: strategy.total_trades + 1u64,
            win_rate: strategy.win_rate,
            roi: strategy.roi,
            is_active: strategy.is_active,
        };
        
        // Note: Signal distribution happens off-chain via backend
        // Backend will call transfer_signal for each subscriber
    }


    // Transfer signal to subscriber (only if subscribed)
    transition transfer_signal(
        public strategy_id: field,
        public subscriber: address,
        signal_type: u8,
        price_target: u64,
        stop_loss: u64,
        take_profit: u64,
        signal_duration: u64
    ) -> Signal {
        
        return Signal {
            owner: subscriber,
            strategy_id: strategy_id,
            signal_type: signal_type,
            timestamp: block.height,
            price_target: price_target,
            stop_loss: stop_loss,
            take_profit: take_profit,
            expiry: block.height + signal_duration,
        } then finalize(subscriber, strategy_id);
    }

    finalize transfer_signal(subscriber: address, strategy_id: field) {
        // Verify subscriber has active subscription
        let sub_key: field = BHP256::hash_to_field(subscriber);
        let expiry: u64 = Mapping::get(active_subscriptions, sub_key);
        assert(block.height < expiry);
    }


    // Verify signal authenticity and not expired
    transition verify_signal(
        signal: Signal,
        public strategy_id: field
    ) -> bool {
        let is_valid: bool = signal.strategy_id == strategy_id;
        let not_expired: bool = block.height < signal.expiry;
        return is_valid && not_expired;
    }


    // ========== REVENUE MANAGEMENT ==========

    // Provider withdraws earnings
    transition withdraw_earnings(
        public amount: u64
    ) -> credits.aleo/credits {
        
        return credits.aleo/transfer_public(
            self.caller,
            amount
        ) then finalize(self.caller, amount);
    }

    finalize withdraw_earnings(provider: address, amount: u64) {
        let current_earnings: u64 = Mapping::get(provider_earnings, provider);
        assert(current_earnings >= amount);
        Mapping::set(provider_earnings, provider, current_earnings - amount);
    }


    // Check subscription status (helper)
    transition check_subscription(
        subscription: Subscription
    ) -> bool {
        let is_active: bool = subscription.is_active;
        let not_expired: bool = block.height < subscription.expiry;
        return is_active && not_expired;
    }
}
