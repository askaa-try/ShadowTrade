// ShadowTrade v3 - Hybrid Signal Distribution
// Optimized for scalability with off-chain encryption

program shadowtrade.aleo {
    
    record Strategy {
        owner: address,
        strategy_id: field,
        price: u64,
        total_trades: u64,
        win_rate: u64,
        roi: i64,
        is_active: bool,
    }

    // Signal Announcement - published once for all subscribers
    record SignalAnnouncement {
        owner: address,          // Strategy owner
        strategy_id: field,
        signal_hash: field,      // Hash of signal data
        timestamp: u64,
        expiry: u64,
        encrypted_data: field,   // Encrypted signal (off-chain encryption)
    }

    record Subscription {
        owner: address,
        provider: address,
        strategy_id: field,
        expiry: u64,
        is_active: bool,
    }

    mapping registered_strategies: field => bool;
    mapping active_subscriptions: field => u64;
    mapping provider_earnings: address => u64;
    mapping signal_count: field => u64;  // Track signals per strategy


    // ========== STRATEGY MANAGEMENT ==========

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
        let is_registered: bool = Mapping::get_or_use(registered_strategies, strategy_id, false);
        assert(!is_registered);
        Mapping::set(registered_strategies, strategy_id, true);
        Mapping::set(signal_count, strategy_id, 0u64);
    }


    // ========== SUBSCRIPTION WITH ADJUSTED SPLIT ==========

    // Payment split: 75% provider, 25% platform (more sustainable)
    transition subscribe_with_payment(
        public strategy_id: field,
        public duration: u64,
        payment: credits.aleo/credits,
        public provider: address,
        public price: u64
    ) -> (Subscription, credits.aleo/credits, credits.aleo/credits) {
        
        // Split: 75% provider, 25% platform
        let provider_share: u64 = (price * 75u64) / 100u64;
        let platform_share: u64 = price - provider_share;
        
        let provider_payment: credits.aleo/credits = credits.aleo/transfer_private(
            payment,
            provider,
            provider_share
        );
        
        let platform_payment: credits.aleo/credits = credits.aleo/transfer_private(
            payment,
            aleo1platform_address_here,
            platform_share
        );
        
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
        let sub_key: field = BHP256::hash_to_field(subscriber);
        Mapping::set(active_subscriptions, sub_key, expiry);
        
        let current_earnings: u64 = Mapping::get_or_use(provider_earnings, provider, 0u64);
        Mapping::set(provider_earnings, provider, current_earnings + amount);
    }


    // ========== HYBRID SIGNAL DISTRIBUTION ==========

    // Publish signal announcement (ONE transaction for ALL subscribers)
    transition publish_signal(
        strategy: Strategy,
        signal_hash: field,
        encrypted_data: field,  // Pre-encrypted off-chain for all subscribers
        signal_duration: u64
    ) -> (Strategy, SignalAnnouncement) {
        
        assert_eq(self.caller, strategy.owner);
        assert(strategy.is_active);
        
        let updated_strategy: Strategy = Strategy {
            owner: strategy.owner,
            strategy_id: strategy.strategy_id,
            price: strategy.price,
            total_trades: strategy.total_trades + 1u64,
            win_rate: strategy.win_rate,
            roi: strategy.roi,
            is_active: strategy.is_active,
        };
        
        let announcement: SignalAnnouncement = SignalAnnouncement {
            owner: strategy.owner,
            strategy_id: strategy.strategy_id,
            signal_hash: signal_hash,
            timestamp: block.height,
            expiry: block.height + signal_duration,
            encrypted_data: encrypted_data,
        };
        
        return (updated_strategy, announcement) then finalize(strategy.strategy_id);
    }

    finalize publish_signal(strategy_id: field) {
        let count: u64 = Mapping::get(signal_count, strategy_id);
        Mapping::set(signal_count, strategy_id, count + 1u64);
    }


    // Verify subscriber can access signal
    transition verify_access(
        subscription: Subscription,
        announcement: SignalAnnouncement
    ) -> bool {
        let is_same_strategy: bool = subscription.strategy_id == announcement.strategy_id;
        let is_active: bool = subscription.is_active;
        let not_expired_sub: bool = block.height < subscription.expiry;
        let not_expired_signal: bool = block.height < announcement.expiry;
        
        return is_same_strategy && is_active && not_expired_sub && not_expired_signal;
    }


    // ========== REVENUE MANAGEMENT ==========

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
}
