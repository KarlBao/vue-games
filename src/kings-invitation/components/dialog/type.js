/**
 * 对话框的类型，用以决定对话框显示后的下一步操作
 */
const TYPE = {
  /**
   * 普通对话框，完成后点击显示下一个对话框
   */
  NORMAL: 'normal',

  /**
   * 完成后点击显示轮盘
   */
  ROULETTE: 'roulette',

  /**
   * 游戏结束对话框
   */
  GAMEOVER: 'gameover'
}

export default TYPE
