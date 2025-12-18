/**
 * 二次封装的缓动函数（Quadratic easeInOut）
 * @param t 当前时间
 * @param b 起始值
 * @param c 变化量
 * @param d 持续时间
 * @returns 当前值
 */
// @ts-ignore
Math.easeInOutQuad = function (t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame 兼容性封装
const requestAnimFrame: (callback: FrameRequestCallback) => number =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback: FrameRequestCallback) { return window.setTimeout(callback, 1000 / 60); };

/**
 * 滚动到指定位置
 * @param amount 滚动距离
 */
function move(amount: number): void {
  document.documentElement.scrollTop = amount;
  (document.body.parentNode as HTMLElement).scrollTop = amount;
  document.body.scrollTop = amount;
}

/**
 * 获取当前滚动位置
 * @returns 滚动条位置
 */
function position(): number {
  return document.documentElement.scrollTop ||
    (document.body.parentNode as HTMLElement).scrollTop ||
    document.body.scrollTop;
}

/**
 * 平滑滚动到指定位置
 * @param to 目标位置
 * @param duration 持续时间（毫秒）
 * @param callback 滚动结束回调
 */
export function scrollTo(to: number, duration: number = 500, callback?: () => void): void {
  const start: number = position();
  const change: number = to - start;
  const increment: number = 20;
  let currentTime: number = 0;
  duration = typeof duration === 'undefined' ? 500 : duration;
  const animateScroll = function () {
    currentTime += increment;
    const val = (Math as any).easeInOutQuad(currentTime, start, change, duration);
    move(val);
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };
  animateScroll();
}
