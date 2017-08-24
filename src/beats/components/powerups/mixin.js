const mixin = {
  props: {
    name: {
      required: true,
      type: String
    }
  },
  computed: {
    num () {
      return this.$store.getters.getPowerups[this.name].num
    },
    keyCode () {
      return this.$store.getters.getPowerups[this.name].keyCode
    }
  },
  mounted () {
    this.register()
  },
  methods: {
    register () {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode !== this.keyCode) { return }
        if (this.num <= 0) { return }
        if (this.usePowerup() !== false) {
          this.$store.dispatch('setPowerupNumOffset', {powerup: this.name, offset: -1})
        }
      })
    },
    /**
     * powerup中需要实现此方法
     * @return {Boolean} 当返回false时，不会消耗技能
     */
    usePowerup () {
      // powerup中需要实现此方法
    }
  }
}

export default mixin
