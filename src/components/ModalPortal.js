import Backdrop from './Backdrop'
import ModalContent from './ModalContent'
import { addDocumentClass, removeDocumentClass } from '../dom'

const openClassBody = 'modal-open'

export default {
  methods: {
    update (name, current, props, children) {
      this._current = current
      this._modals[name] = createModalVNode(
        this.$createElement,
        { props },
        children
      )

      this.scheduleUpdate()
    },

    scheduleUpdate () {
      if (this._scheduled) return
      this._scheduled = true

      this.$nextTick(() => {
        this.$forceUpdate()
        this._scheduled = false
      })
    },

    unregister (name) {
      this._modals[name] = undefined
    }
  },

  beforeMount () {
    this._current = null
    this._modals = {}
  },

  render (h) {
    if (this._current == null) {
      removeDocumentClass(openClassBody)
    } else {
      addDocumentClass(openClassBody)
    }

    return this._modals[this._current] || createModalVNode(h, {}, [])
  }
}

function createModalVNode (h, data, children) {
  return (
    h('div', { staticClass: 'modal-wrapper' }, [
      h(Backdrop, data),
      h(ModalContent, data, children)
    ])
  )
}
