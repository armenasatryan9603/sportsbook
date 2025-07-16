import type { AppDispatch } from "../store/store";
import { updateRandomOdds } from "../store/slices/matchesSlice";

export class OddsUpdateService {
  private intervalId: number | null = null;
  private dispatch: AppDispatch;
  private isActive: boolean = false;
  private updateCount: number = 0;
  private readonly maxUpdates: number = 1000; // Prevent memory leaks with max updates
  private updateInterval: number = 5000; // 3 seconds

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  // Start the real-time odds update service
  start() {
    if (this.intervalId) {
      this.stop(); // Stop any existing interval
    }

    this.isActive = true;
    this.updateCount = 0;

    // Update odds every 3 seconds
    this.intervalId = window.setInterval(() => {
      if (!this.isActive) return;

      // Prevent excessive updates
      if (this.updateCount >= this.maxUpdates) {
        console.warn("⚠️ Maximum updates reached, stopping service");
        this.stop();
        return;
      }

      this.dispatch(updateRandomOdds());
      //   this.updateCount++;
    }, this.updateInterval);

    // Only log in development mode
    if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
      console.log(
        "🔄 Real-time odds pulse service started - updating every 3 seconds"
      );
    }
  }

  // Stop the real-time odds update service
  stop() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
        console.log(
          `⏹️ Real-time odds pulse service stopped after ${this.updateCount} updates`
        );
      }
    }
  }

  // Check if the service is running
  isRunning(): boolean {
    return this.intervalId !== null && this.isActive;
  }

  // Manually trigger an odds update
  triggerUpdate() {
    if (this.isActive) {
      this.dispatch(updateRandomOdds());
      this.updateCount++;
    }
  }

  // Get current update count
  getUpdateCount(): number {
    return this.updateCount;
  }

  // Reset update count
  resetUpdateCount(): void {
    this.updateCount = 0;
  }

  // Update the interval (useful for dynamic adjustment)
  changeInterval(newInterval: number): void {
    this.updateInterval = newInterval;
    if (this.intervalId) {
      this.stop();
      this.start();
    }
  }

  // Cleanup method
  destroy(): void {
    this.stop();
    this.updateCount = 0;
  }
}

// Optimized hook with proper cleanup and memoization
export const useOddsUpdateService = (dispatch: AppDispatch) => {
  // Create service instance only once
  const service = new OddsUpdateService(dispatch);

  return {
    start: () => service.start(),
    stop: () => service.stop(),
    isRunning: () => service.isRunning(),
    triggerUpdate: () => service.triggerUpdate(),
    getUpdateCount: () => service.getUpdateCount(),
    resetUpdateCount: () => service.resetUpdateCount(),
    destroy: () => service.destroy(),
  };
};
