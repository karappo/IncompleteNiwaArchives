export const state = () => ({
  lastUpdateDateTime: {}, // 各スプレッドシートの最終更新日時を保持
  cameraPosition: null,
  cameraTarget: null,
  pageName: '', // nullにするとエラーになる箇所があるので、必ずStringにしておく
  tourName: null,
  autoplay: false,
  acceptUnoptimizedSP: false, // SPに最適化されていない旨を了承済み
  annotationVisibilities: {
    Annotations: true,
    Viewpoints: true,
    'Viewpoints/Still Images': true,
    'Viewpoints/Movies': true,
    Elements: true,
    'Elements/Stones': true,
    'Elements/Plants': true,
    'Elements/Creatures': true,
    'Elements/Artifacts': true,
    'Elements/DNA Data': true,
    'Oral Archives': true
  },
  // TODO ここ以降おそらく不要なので消す。合わせてFooter.vueも消す
  EDLEnabled: true,
  EDLRadius: 0, // default: 1.4
  EDLStrength: 0, // default: 0.4
  EDLOpacity: 0.85, // default: 1.0
  shape: 1,
  size: 0.66,
  pointBudget: 2000000,
  cameraAnimationCount: 0,
  controlMode: 0 // 3つのcontrolsModeのうち、どれにするかを切り替える0,1,2のいずれか
})

export const mutations = {
  lastUpdateDateTime(state, { key, value }) {
    state.lastUpdateDateTime[key] = value
  },
  cameraPosition(state, value) {
    state.cameraPosition = value
  },
  cameraTarget(state, value) {
    state.cameraTarget = value
  },
  pageName(state, value) {
    state.pageName = value
  },
  tourName(state, value) {
    state.tourName = value
  },
  autoplay(state, value) {
    state.autoplay = value
  },
  acceptUnoptimizedSP(state, value) {
    state.acceptUnoptimizedSP = value
  },
  annotationVisibilities(state, { key, value }) {
    switch (key) {
      case 'Annotations':
        // 全部変更
        for (const k in state.annotationVisibilities) {
          state.annotationVisibilities[k] = value
        }
        break
      case 'Viewpoints':
      case 'Elements':
        // Viewpoints/... や Elements/... を全部変更
        for (const k in state.annotationVisibilities) {
          if (k.includes(`${key}/`)) {
            state.annotationVisibilities[k] = value
          }
        }
        break
    }
    state.annotationVisibilities[key] = value
  },
  EDLEnabled(state, value) {
    state.EDLEnabled = value
  },
  EDLRadius(state, value) {
    state.EDLRadius = value * 1
  },
  EDLStrength(state, value) {
    state.EDLStrength = value * 1
  },
  EDLOpacity(state, value) {
    state.EDLOpacity = value * 1
  },
  shape(state, value) {
    state.shape = value * 1
  },
  size(state, value) {
    state.size = value
  },
  pointBudget(state, value) {
    state.pointBudget = value
  },
  cameraAnimationCount(state, value) {
    state.cameraAnimationCount = value
  },
  controlMode(state, value) {
    // validation
    if (0 <= value && value <= 2) {
      state.controlMode = value
    } else {
      console.error('Invalid value : ' + value)
    }
  }
}

export const getters = {
  lastUpdateDateTime(state) {
    return state.lastUpdateDateTime
  },
  cameraPosition(state) {
    return state.cameraPosition
  },
  cameraTarget(state) {
    return state.cameraTarget
  },
  pageName(state) {
    return state.pageName
  },
  tourName(state) {
    return state.tourName
  },
  autoplay(state) {
    return state.autoplay
  },
  acceptUnoptimizedSP(state) {
    return state.acceptUnoptimizedSP
  },
  annotationVisibilities(state) {
    return state.annotationVisibilities
  },
  EDLEnabled(state) {
    return state.EDLEnabled
  },
  EDLRadius(state) {
    return state.EDLRadius
  },
  EDLStrength(state) {
    return state.EDLStrength
  },
  EDLOpacity(state) {
    return state.EDLOpacity
  },
  shape(state) {
    return state.shape
  },
  size(state) {
    return state.size
  },
  pointBudget(state) {
    return state.pointBudget
  },
  cameraAnimationCount(state) {
    return state.cameraAnimationCount
  },
  controlMode(state) {
    return state.controlMode
  }
}
