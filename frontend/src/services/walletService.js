// Aleo Wallet Service
// This will integrate with Aleo wallet extension

class AleoWalletService {
  constructor() {
    this.account = null;
    this.connected = false;
  }

  async connect() {
    try {
      // Check if Aleo wallet is installed
      if (typeof window.aleo === 'undefined') {
        throw new Error('Aleo wallet not installed');
      }

      // Request account access
      const accounts = await window.aleo.request({
        method: 'eth_requestAccounts',
      });

      this.account = accounts[0];
      this.connected = true;

      return this.account;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async disconnect() {
    this.account = null;
    this.connected = false;
  }

  async getBalance() {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const balance = await window.aleo.request({
        method: 'eth_getBalance',
        params: [this.account, 'latest'],
      });

      return balance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  async signTransaction(transaction) {
    if (!this.connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await window.aleo.request({
        method: 'eth_signTransaction',
        params: [transaction],
      });

      return signature;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  }

  isConnected() {
    return this.connected;
  }

  getAccount() {
    return this.account;
  }
}

export default new AleoWalletService();
