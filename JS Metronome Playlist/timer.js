function Timer(callback, timeInterval, options) {
    this.timeInterval = timeInterval;
    
    // Add method to start timer
    this.start = () => {
      // Set the expected time 
      this.expected = Date.now() + this.timeInterval;
      // Start the timeout
      this.theTimeout = null;
      
      if (options.immediate) {
        callback();
      } 
      
      this.timeout = setTimeout(this.round, this.timeInterval);
      console.log('Timer Started');
    }
    // Add method to stop timer
    this.stop = () => {
  
      clearTimeout(this.timeout);
      console.log('Timer Stopped');
    }
    // Round method runs callback and adjusts time
    this.round = () => {
      console.log('timeout', this.timeout);
      // The drift will be the current time minus expected time
      let drift = Date.now() - this.expected;
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > this.timeInterval) {
        // If error callback is provided
        if (options.errorCallback) {
          options.errorCallback();
        }
      }
      callback();
      // Increment expected time by time interval
      this.expected += this.timeInterval;
      console.log('Drift:', drift);
      console.log('Next round time interval:', this.timeInterval - drift);
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift
      this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
  }

  export default Timer;