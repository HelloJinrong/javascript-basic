import EventEmitter from 'events';

describe('for event', () => {
  function waitForEvents() {
    return new Promise(resolve => setTimeout(() => resolve(), 0));
  }

  it('should capture event', (done) => {
    const element = new EventEmitter();
    const logs = [];

    function onClick() {
      logs.push('I have been clicked.');
      done();
    }

    // <--start
    // Please add the event listener to handle `click` event on `element`.
    element.addListener('click', onClick, false);
    // 3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。
    // 最后一个布尔值参数如果是true，表示在事件捕获阶段调用事件处理程序；如果是false，表示在事件冒泡阶段调用事件处理程序。
    // --end->

    element.emit('click');
  }, 1000 /* 1 second to timeout */);

  it('should invoke multiple times', (done) => {
    const element = new EventEmitter();
    const logs = [];

    element.addListener('click', () => logs.push('I have been clicked'));
    element.emit('click');
    element.emit('click');

    waitForEvents()
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['I have been clicked', 'I have been clicked'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });
  });

  it('should remove event listener', (done) => {
    const element = new EventEmitter();
    const logs = [];

    element.addListener('click', () => {
      logs.push('I have been clicked');
      element.removeAllListeners('click');
    });
    element.emit('click');
    element.emit('click');

    waitForEvents()
      .then(() => {
        // <--start
        // Please write down the correct value. You should write the final result directly.
        const expected = ['I have been clicked'];
        // --end->

        expect(logs).toEqual(expected);
        done();
      });
  });
});
