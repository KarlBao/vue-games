import DIALOG_TYPE from './../dialog/type'

const SPEAKERS = {
  BILI: '比利王'
}
const ROULETTE = {
  SUCCESS: 1,
  FAIL: 0
}

class Dialog {
  constructor (opts = {}) {
    const defaultOpts = {
      speaker: '???',
      text: '???', // 显示的对话内容
      speed: 50, // 显示速度，最快为0
      type: DIALOG_TYPE.NORMAL, // 对话框类型，参照 DIALOG_TYPE 字段说明
      handleRoulette: () => {} // 轮盘模式下必须指定的回调函数，无返回值或返回值false时不跳转，否则跳转到相应场景
    }
    Object.assign(this, defaultOpts, opts)
  }
}

const scenes = [
  // Scene 0, 初始场景
  {
    character: 'character_0.png',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        text: '哦？你醒了...'
      }),
      new Dialog({
        text: '因为之前不小心撞了你一下，你已经在这儿昏迷三天三夜了。'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '忘了自我介绍了，我叫比利王。是这所学校的哲学老师。'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '嗯...呼...呼...',
        speed: 150
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '好热啊，能帮我把外套脱了吗？（糟糕的借口）'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '转动这个转盘，如果停在正确的区域，就能帮我脱衣服哦~~',
        type: DIALOG_TYPE.ROULETTE,
        handleRoulette: (area) => {
          return area.type === ROULETTE.SUCCESS ? 1 : 2
        }
      })
    ]
  },
  // Scene 1
  {
    character: 'character_0.png',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '呼...总算凉快点了...可是感觉还是有点热...'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '再帮我脱一件吧',
        type: DIALOG_TYPE.ROULETTE,
        handleRoulette: (area) => {
          return area.type === ROULETTE.SUCCESS ? 3 : 2
        }
      })
    ]
  },
  // Scene 2
  {
    character: '',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '唔...你这是想要热死我吗？'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '第一次警告你，好好脱！'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: 'ASS...YOU...CAN!',
        speed: 150,
        type: DIALOG_TYPE.ROULETTE,
        handleRoulette: (area) => {
          return area.type === ROULETTE.SUCCESS ? 3 : 2
        }
      })
    ]
  },
  // Scene 3
  {
    character: '',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '哟西，你离王の真相又近了一步。'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '再次转动转盘，继续帮我脱吧~ ♥',
        type: DIALOG_TYPE.ROULETTE,
        handleRoulette: (area) => {
          return area.type === ROULETTE.SUCCESS ? 5 : 2
        }
      })
    ]
  },
  // Scene 4
  {
    character: '',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '热死啦！！！！'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '走吧，我觉得我们需要去隔壁澡堂聊一聊。',
        type: DIALOG_TYPE.GAMEOVER
      })
    ]
  },
  // Scene 5
  {
    character: '',
    background: require('./assets/classroom_night.jpg'),
    dialogs: [
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: 'Ohh~~你好像发现了王の真相'
      }),
      new Dialog({
        speaker: SPEAKERS.BILI,
        text: '让我们去格斗室一起探讨一下哲学吧',
        type: DIALOG_TYPE.GAMEOVER
      })
    ]
  }
]

export default scenes
