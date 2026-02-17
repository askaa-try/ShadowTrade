// ShadowTrade - Private Trading Signal Marketplace
program shadowtrade.aleo {
    
    // Strategy record
    record Strategy {
        owner: address,
        strategy_id: field,
        price: u64,
        is_active: bool,
    }

    // Subscription record
    record Subscription {
        owner: address,
        provider: address,
        strategy_id: field,
        expiry: u32,
        is_active: bool,
    }

    // Mappings
    mapping strategies: field => address;
    mapping subscriptions: field => u32;
    mapping earnings: address => u64;

    // Register new strategy
    async transition register_strategy(
        public strategy_id: field,
        public price: u64
    ) -> (Strategy, Future) {
        let strategy: Strategy = Strategy {
            owner: self.caller,
            strategy_id: strategy_id,
            price: price,
            is_active: true,
        };
        
        return (strategy, finalize_register(strategy_id, self.caller));
    }

    async function finalize_register(strategy_id: field, owner: address) {
        Mapping::set(strategies, strategy_id, owner);
    }

    // Subscribe to strategy with payment split
    async transition subscribe(
        public strategy_id: field,
        public provider: address,
        public price: u64,
        public duration: u32
    ) -> (Subscription, Future) {
        let provider_share: u64 = (price * 75u64) / 100u64;
        
        let subscription: Subscription = Subscription {
            owner: self.caller,
            provider: provider,
            strategy_id: strategy_id,
            expiry: 0u32, // Will be set in finalize
            is_active: true,
        };
        
        return (subscription, finalize_subscribe(self.caller, strategy_id, duration, provider, provider_share));
    }

    async function finalize_subscribe(
        subscriber: address,
        strategy_id: field,
        duration: u32,
        provider: address,
        amount: u64
    ) {
        let sub_key: field = BHP256::hash_to_field(subscriber as field);
        let expiry: u32 = block.height + duration;
        Mapping::set(subscriptions, sub_key, expiry);
        
        let current: u64 = Mapping::get_or_use(earnings, provider, 0u64);
        Mapping::set(earnings, provider, current + amount);
    }

    // Verify subscription is active
    async transition verify_subscription(
        public subscriber: address,
        public strategy_id: field
    ) -> Future {
        return finalize_verify(subscriber, strategy_id);
    }

    async function finalize_verify(subscriber: address, strategy_id: field) {
        let sub_key: field = BHP256::hash_to_field(subscriber as field);
        let expiry: u32 = Mapping::get(subscriptions, sub_key);
        assert(block.height < expiry);
    }

    // Withdraw earnings
    async transition withdraw(public amount: u64) -> Future {
        return finalize_withdraw(self.caller, amount);
    }

    async function finalize_withdraw(provider: address, amount: u64) {
        let current: u64 = Mapping::get(earnings, provider);
        assert(current >= amount);
        Mapping::set(earnings, provider, current - amount);
    }
}
