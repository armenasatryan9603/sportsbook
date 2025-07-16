import { OddsUpdateService, useOddsUpdateService } from "../oddsUpdateService";
import { updateRandomOdds } from "../../store/slices/matchesSlice";
import type { AppDispatch } from "../../store/store";

// Mock the Redux action
jest.mock("../../store/slices/matchesSlice", () => ({
  updateRandomOdds: jest.fn(),
}));

// Mock console methods
const mockConsole = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock import.meta.env
Object.defineProperty(global, "import.meta", {
  writable: true,
  value: {
    env: {
      DEV: true,
    },
  },
});

describe("OddsUpdateService", () => {
  let mockDispatch: jest.MockedFunction<AppDispatch>;
  let service: OddsUpdateService;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockDispatch = jest.fn();
    service = new OddsUpdateService(mockDispatch);

    // Mock console
    global.console = mockConsole as any;
  });

  afterEach(() => {
    service.destroy();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with correct default values", () => {
      expect(service.isRunning()).toBe(false);
      expect(service.getUpdateCount()).toBe(0);
    });
  });

  describe("start", () => {
    it("should start the service and set running state", () => {
      service.start();

      expect(service.isRunning()).toBe(true);
      expect(mockConsole.log).toHaveBeenCalledWith(
        "🔄 Real-time odds pulse service started - updating every 3 seconds"
      );
    });

    it("should dispatch updateRandomOdds every 3 seconds", () => {
      service.start();

      // Initially no calls
      expect(mockDispatch).not.toHaveBeenCalled();

      // After 3 seconds
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(updateRandomOdds());

      // After 6 seconds
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(2);

      // After 9 seconds
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it("should increment update count on each dispatch", () => {
      service.start();

      expect(service.getUpdateCount()).toBe(0);

      jest.advanceTimersByTime(3000);
      expect(service.getUpdateCount()).toBe(1);

      jest.advanceTimersByTime(3000);
      expect(service.getUpdateCount()).toBe(2);
    });

    it("should stop previous interval if already running", () => {
      service.start();
      const firstInterval = service.isRunning();

      service.start(); // Start again

      expect(firstInterval).toBe(true);
      expect(service.isRunning()).toBe(true);

      // Should still work normally
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it("should reset update count when restarted", () => {
      service.start();

      jest.advanceTimersByTime(6000);
      expect(service.getUpdateCount()).toBe(2);

      service.start(); // Restart
      expect(service.getUpdateCount()).toBe(0);
    });

    it("should not log in production mode", () => {
      // Set production mode
      (global as any).import.meta.env.DEV = false;

      service.start();

      expect(mockConsole.log).not.toHaveBeenCalled();
    });
  });

  describe("stop", () => {
    it("should stop the service and clear running state", () => {
      service.start();
      expect(service.isRunning()).toBe(true);

      service.stop();
      expect(service.isRunning()).toBe(false);
    });

    it("should stop dispatching updates", () => {
      service.start();

      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      service.stop();

      jest.advanceTimersByTime(6000);
      expect(mockDispatch).toHaveBeenCalledTimes(1); // No additional calls
    });

    it("should log stop message with update count", () => {
      service.start();

      jest.advanceTimersByTime(6000);
      expect(service.getUpdateCount()).toBe(2);

      service.stop();

      expect(mockConsole.log).toHaveBeenCalledWith(
        "⏹️ Real-time odds pulse service stopped after 2 updates"
      );
    });

    it("should handle stop when not running", () => {
      expect(service.isRunning()).toBe(false);

      service.stop();

      expect(service.isRunning()).toBe(false);
      expect(mockConsole.log).not.toHaveBeenCalled();
    });
  });

  describe("triggerUpdate", () => {
    it("should dispatch update when service is active", () => {
      service.start();

      service.triggerUpdate();

      expect(mockDispatch).toHaveBeenCalledWith(updateRandomOdds());
      expect(service.getUpdateCount()).toBe(1);
    });

    it("should not dispatch when service is not active", () => {
      expect(service.isRunning()).toBe(false);

      service.triggerUpdate();

      expect(mockDispatch).not.toHaveBeenCalled();
      expect(service.getUpdateCount()).toBe(0);
    });

    it("should increment update count", () => {
      service.start();

      service.triggerUpdate();
      service.triggerUpdate();

      expect(service.getUpdateCount()).toBe(2);
    });
  });

  describe("getUpdateCount", () => {
    it("should return current update count", () => {
      service.start();

      expect(service.getUpdateCount()).toBe(0);

      jest.advanceTimersByTime(9000);
      expect(service.getUpdateCount()).toBe(3);
    });
  });

  describe("resetUpdateCount", () => {
    it("should reset update count to 0", () => {
      service.start();

      jest.advanceTimersByTime(6000);
      expect(service.getUpdateCount()).toBe(2);

      service.resetUpdateCount();
      expect(service.getUpdateCount()).toBe(0);
    });
  });

  describe("changeInterval", () => {
    it("should restart service with new interval", () => {
      service.start();

      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      service.changeInterval(1000);

      // Should work with new interval
      jest.advanceTimersByTime(1000);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it("should not restart if service is not running", () => {
      expect(service.isRunning()).toBe(false);

      service.changeInterval(1000);

      expect(service.isRunning()).toBe(false);
    });
  });

  describe("destroy", () => {
    it("should stop service and reset count", () => {
      service.start();

      jest.advanceTimersByTime(6000);
      expect(service.getUpdateCount()).toBe(2);
      expect(service.isRunning()).toBe(true);

      service.destroy();

      expect(service.isRunning()).toBe(false);
      expect(service.getUpdateCount()).toBe(0);
    });
  });

  describe("maximum updates protection", () => {
    it("should stop service after maximum updates", () => {
      service.start();

      // Fast forward to trigger max updates (1000)
      jest.advanceTimersByTime(1000 * 3000); // 1000 updates * 3 seconds each

      expect(service.getUpdateCount()).toBe(1000);
      expect(service.isRunning()).toBe(false);
      expect(mockConsole.warn).toHaveBeenCalledWith(
        "⚠️ Maximum updates reached, stopping service"
      );
    });

    it("should not dispatch after reaching maximum", () => {
      service.start();

      // Advance to just before max
      jest.advanceTimersByTime(999 * 3000);
      expect(mockDispatch).toHaveBeenCalledTimes(999);

      // Advance to max
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1000);

      // Should not dispatch after max
      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1000);
    });
  });

  describe("inactive state protection", () => {
    it("should not dispatch when service is inactive", () => {
      service.start();

      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1);

      service.stop();

      jest.advanceTimersByTime(3000);
      expect(mockDispatch).toHaveBeenCalledTimes(1); // No additional calls
    });
  });
});

describe("useOddsUpdateService", () => {
  let mockDispatch: jest.MockedFunction<AppDispatch>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return service methods", () => {
    const serviceHook = useOddsUpdateService(mockDispatch);

    expect(serviceHook).toHaveProperty("start");
    expect(serviceHook).toHaveProperty("stop");
    expect(serviceHook).toHaveProperty("isRunning");
    expect(serviceHook).toHaveProperty("triggerUpdate");
    expect(serviceHook).toHaveProperty("getUpdateCount");
    expect(serviceHook).toHaveProperty("resetUpdateCount");
    expect(serviceHook).toHaveProperty("destroy");

    expect(typeof serviceHook.start).toBe("function");
    expect(typeof serviceHook.stop).toBe("function");
    expect(typeof serviceHook.isRunning).toBe("function");
    expect(typeof serviceHook.triggerUpdate).toBe("function");
    expect(typeof serviceHook.getUpdateCount).toBe("function");
    expect(typeof serviceHook.resetUpdateCount).toBe("function");
    expect(typeof serviceHook.destroy).toBe("function");
  });

  it("should create new service instance for each call", () => {
    const service1 = useOddsUpdateService(mockDispatch);
    const service2 = useOddsUpdateService(mockDispatch);

    // Should be different instances
    expect(service1).not.toBe(service2);
  });
});
