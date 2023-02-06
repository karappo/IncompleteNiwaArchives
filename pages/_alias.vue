<template lang="pug">
.root
  SorryScreen(v-if="$device.isMobile && !$store.getters.acceptUnoptimizedSP")
  template(v-else)
    main
      splitpanes.default-theme
        pane.potree_container(
          size="60"
        )
          //- TODO 追々対応が確認できたら個々の条件を見直すこと
          .notice(v-if="!$ua.is.chrome && noticeVisibility")
            p
              | このブラウザは閲覧時に不具合の可能性があります。デスクトップ版
              ExternalLink(href="https://www.google.com/chrome/") Chrome
              //- | または
              //- ExternalLink(href="https://www.mozilla.org/ja/firefox/new/") Firefox
              | でご覧ください。
            .closeButton(@click="noticeVisibility = false")
              IconClose
          .potree_wrap
            #potree_render_area(
              ref="potree_render_area"
              :class="potreeRenderAreaClass"
            )
              .debugMenuButton(@click.shift="viewer.toggleSidebar()")
              .controls
                h1.title
                  span.global Incomplete Niwa Archives
                  span.scene {{ data.title }}
                template(v-if="tourName")
                  TourIndicator(
                    :numerator="listData.list.length"
                    :denominator="currentIndex + 1"
                  )
                  StopTourButton
                template(v-else)
                  KeyMap
            #potree_sidebar_container
        pane.drawer(
          v-if="!(tourName && tourName.includes('without Annotations')) && (listData || annotationData)"
          size="40"
          min-size="25"
          max-size="75"
          :class="{border: !tourName}"
        )
          //- TODO Historyを開いた状態で、Annotationをクリックしたら開かない…
          DrawerHistory(
            v-if="$store.getters.pageName === 'History'"
          )
          Drawer3DData(
            v-else-if="$store.getters.pageName === '3D Data'"
          )
          DrawerAnnotation(
            v-else-if="annotationData"
            :data="annotationData"
            :annotations="annotations"
            :prevNextVisibility="prevNextVisibility"
            :prevDisabled="prevDisabled"
            :nextDisabled="nextDisabled"
            @backToList="clearSelectedAnnotation"
            @prev="prev"
            @next="next"
          )
          DrawerList(
            v-else-if="listData"
            :data="listData"
            @next="next"
          )
      SoundBar(:annotations="annotations")
    SideBar.sideBar(
      v-if="!tourName"
      :guidedTourExists="0 < data.guidedTour.length"
      :variations="this.data.variations"
      @saveCameraInfo="saveCameraInfo"
    )
</template>

<style lang="sass" scoped>
.root
  width: 100%
  height: var(--vh)
  background: #000
  display: flex
main
  display: flex
  flex-direction: column
  width: 100%
.debugMenuButton
  width: 4px
  height: 4px
  background: transparent
  position: absolute
  top: 0
  left: 0
  cursor: pointer
  z-index: 100
.sideBar
  flex-shrink: 0
  width: 165px
  height: 100%
  margin: 0
  border-left: 0
.title
  margin: 24px
  font-family: 'K2-v1-Light'
  font-weight: normal
  font-size: 17px
  color: white
  .scene
    margin-left: 26px
.splitpanes.default-theme
  overflow: hidden
  /deep/ .splitpanes__splitter
    background-color: transparent
    border: 0
    width: 7px
    z-index: 2
  .splitpanes__pane
    &.potree_container
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      .notice
        background-color: #C9E2D4
        color: black
        font-size: 13px
        padding: 15px
        display: flex
        align-items: center
        flex-shrink: 0
        a
          margin-left: 0.2em
          margin-right: 0.2em
          text-decoration: underline
        .closeButton
          cursor: pointer
          background-color: #434343
          width: 18px
          height: 18px
          border-radius: 50%
          display: flex
          flex-shrink: 0
          justify-content: center
          align-items: center
          align-self: flex-start
          margin-left: auto
          margin-right: 0
          transition: background-color 0.2s
          svg
            width: 8px
            height: 8px
            line
              stroke: #D3D3D3
              transition: stroke 0.2s
          &:hover
            background-color: black
            svg
              line
                stroke: white
      .potree_wrap
        position: relative
        width: 100%
        height: 100%
    &.drawer
      overflow-y: auto
      background-color: black
      margin-left: -6px
      height: calc(100% - 1px)
      &.border
        border-right: 1px solid #3C3C3C
        border-bottom: 1px solid #3C3C3C
#potree_render_area
  width: 100%
  height: 100%
  &::before
    content: ''
    font-size: 30px
    color: white
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background: #111
    position: absolute
    z-index: 99999999
    opacity: 0
    pointer-events: none
    transition: opacity 3s
  &.disabled
    pointer-events: none
  &.loading
    &::before
      content: 'Loading...'
      opacity: 1
      pointer-events: auto
  /deep/
    canvas
      outline: none

  // アノテーションの表示切り替え
  /deep/ .annotation
    visibility: hidden
  &.rambleTourWithoutAnnotations
    /deep/ .annotation.highlighted
      visibility: visible
  &:not(.rambleTourWithoutAnnotations) // Ramble Tour中はこのクラスがなくなる
    &.viewpointsStillImages
      /deep/ .annotation[data-category="Viewpoints/Still Images"]
        visibility: visible
    &.viewpointsMovies
      /deep/ .annotation[data-category="Viewpoints/Movies"]
        visibility: visible
    &.elementsStones
      /deep/ .annotation[data-category="Elements/Stones"]
        visibility: visible
    &.elementsPlants
      /deep/ .annotation[data-category="Elements/Plants"]
        visibility: visible
    &.elementsCreatures
      /deep/ .annotation[data-category="Elements/Creatures"]
        visibility: visible
    &.elementsArtifacts
      /deep/ .annotation[data-category="Elements/Artifacts"]
        visibility: visible
    &.elementsDnaData
      /deep/ .annotation[data-category="Elements/DNA Data"]
        visibility: visible
    &.oralArchives
      /deep/ .annotation[data-category="Oral Archives"]
        visibility: visible

.controls
  position: absolute
  z-index: 999999
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  pointer-events: none
  > *
    pointer-events: auto
  /deep/ .stopTourButton
    position: absolute
    width: 160px
    height: 50px
    bottom: 25px
    right: 25px
    font-family: 'K2-v1-Bold'
    font-size: 17px
    color: white
    background-color: #1D1D1D
    border-radius: 5px
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: background-color 0.2s
    &:hover
      background-color: lighten(#1D1D1D, 5%)
.sideBar
  grid-area: sidebar
</style>

<script>
import _shuffle from 'lodash/shuffle'
import { camelCase } from 'change-case'
import { ExternalLink } from '@karappo-inc/vue-components'
import IconClose from '~/assets/image/icon-close.svg?inline'
export default {
  components: {
    ExternalLink,
    IconClose
  },
  props: {
    file: {
      type: String,
      require: true,
      default: null
    }
  },
  async asyncData({ route, store }) {
    const annotations = store.state.annotations[camelCase(route.params.alias)]
    let data = await import(`~/data/gardens/${route.params.alias}.js`)
    data = data.default

    return {
      annotations,
      data,
      tours: null,
      annotationData: '',
      listData: null,
      drawerAlreadyOpened: false,
      loading: true,
      noticeVisibility: true,
      rambleTourTimer: null
    }
  },
  computed: {
    viewer() {
      return window.viewer
    },
    prevNextVisibility() {
      return this.listData !== null
    },
    listDataIndexArray() {
      if (this.listData) {
        return this.listData.list.map((a) => a.index)
      }
      return []
    },
    currentIndex() {
      if (!this.annotationData) {
        return null
      }
      return this.listDataIndexArray.indexOf(this.annotationData.index)
    },
    prevDisabled() {
      if (this.listData && this.listData.name.includes('Ramble Tour')) {
        return false
      }
      return this.currentIndex <= 0
    },
    nextDisabled() {
      if (this.listData && this.listData.name.includes('Ramble Tour')) {
        return false
      }
      return this.listDataIndexArray.length - 1 <= this.currentIndex
    },
    potreeRenderAreaClass() {
      // eslint-disable-next-line
      const visibilities = JSON.parse(JSON.stringify(this.$store.getters.annotationVisibilities))
      // キーをクラス名で使える値に変更
      Object.keys(visibilities).forEach(function (key) {
        visibilities[camelCase(key)] = visibilities[key]
        delete visibilities[key]
      })
      const res = visibilities
      res.loading = this.loading
      // eslint-disable-next-line
      res.rambleTourWithoutAnnotations = this.tourName === 'Ramble Tour without Annotations'
      res.disabled = this.tourName !== null
      return res
    },
    tourName() {
      return this.$store.getters.tourName
    }
  },
  watch: {
    tourName(val) {
      if (val === null) {
        this.stopRambleTourWithoutAnnotations()
      }
    }
  },
  async mounted() {
    FONTPLUS.start()
    if (this.$device.isMobile) {
      return
    }
    const viewer = new Potree.Viewer(this.$refs.potree_render_area)
    window.viewer = viewer
    viewer.setFOV(75)
    viewer.setPointBudget(this.$store.getters.pointBudget)
    viewer.loadSettingsFromURL()
    viewer.setBackground('originalColor')

    // Controls
    this.setControlMode(this.$store.getters.controlMode)

    viewer.loadGUI(() => {
      viewer.setLanguage('en')
      $('#menu_tools').next().show()
      $('#menu_scene').next().show()
      // viewer.toggleSidebar() // Open sidebar
    })
    const { pointcloud } = await Potree.loadPointCloud(this.data.pointcloud)
    const material = pointcloud.material
    material.activeAttributeName = 'rgba'
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE

    const config = () => {
      viewer.setEDLEnabled(this.$store.getters.EDLEnabled)
      viewer.setEDLRadius(this.$store.getters.EDLRadius)
      viewer.setEDLStrength(this.$store.getters.EDLStrength)
      viewer.setEDLOpacity(this.$store.getters.EDLOpacity)
      viewer.setPointBudget(this.$store.getters.pointBudget)
      material.shape = this.$store.getters.shape
      material.size = this.$store.getters.size
    }

    viewer.scene.addPointCloud(pointcloud)

    if (
      this.$store.getters.cameraPosition &&
      this.$store.getters.cameraTarget
    ) {
      window.viewer.scene.view.position.set(
        ...this.$store.getters.cameraPosition
      )
      window.viewer.scene.view.lookAt(
        new THREE.Vector3(...this.$store.getters.cameraTarget)
      )
    } else {
      this.data.initCamera()
    }

    // Set Camera Animation
    const tours = []
    this.data.tours.forEach((data) => {
      const animation = new Potree.CameraAnimation(window.viewer)
      for (let i = 0; i < data.positions.length; i++) {
        const cp = animation.createControlPoint()
        cp.position.set(...data.positions[i])
        cp.target.set(...data.targets[i])
      }
      window.viewer.scene.addCameraAnimation(animation)
      animation.setDuration(20)

      animation.setVisible(false)
      tours.push(animation)
    })
    this.tours = tours
    this.$store.commit('cameraAnimationCount', tours.length)

    if (this.annotations) {
      this.annotations.forEach((data, index) => {
        data.index = index
        data.cameraTarget = data.cameraTarget || data.position // cameraTargetがない場合はpositionで代替
        const a = new Potree.Annotation(data)
        // Cancel Potree default behavior
        a.domElement.off('mouseenter')
        a.domElement.off('mouseleave')
        // クリックした時の処理
        a.addEventListener('click', this.clickAnnotation)
        a.addEventListener('onCameraAnimationComplete', this.onCameraAnimationComplete) // eslint-disable-line
        window.viewer.scene.annotations.add(a)
      })
    }

    // Set Events
    this.$nuxt.$on('closeDrawer', this.closeDrawer)
    this.$nuxt.$on('settingUpdated', config)
    this.$nuxt.$on('setControlMode', this.setControlMode)
    this.$nuxt.$on('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$on('selectList', this.selectList)
    this.$nuxt.$on('showAnnotation', this.showAnnotation)
    this.$nuxt.$on('showAnnotationById', this.showAnnotationById)
    this.$nuxt.$on('startRambleTourWithoutAnnotations', this.startRambleTourWithoutAnnotations) // eslint-disable-line
    window.viewer.addEventListener('camera_changed', this.update)

    config()

    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  beforeDestroy() {
    if (this.$device.isMobile) {
      return
    }
    this.$nuxt.$off('closeDrawer', this.closeDrawer)
    this.$nuxt.$off('settingUpdated')
    this.$nuxt.$off('setControlMode', this.setControlMode)
    this.$nuxt.$off('startCameraAnimation', this.startCameraAnimation)
    this.$nuxt.$off('selectList', this.selectList)
    this.$nuxt.$off('showAnnotation', this.showAnnotation)
    this.$nuxt.$off('showAnnotationById', this.showAnnotationById)
    this.$nuxt.$off('startRambleTourWithoutAnnotations', this.startRambleTourWithoutAnnotations) // eslint-disable-line
    window.viewer.removeEventListener('camera_changed', this.update)
    if (window.viewer.scene.annotations) {
      window.viewer.scene.annotations.children.forEach((a) => {
        a.removeEventListener('click', this.clickAnnotation)
        a.removeEventListener('onCameraAnimationComplete', this.onCameraAnimationComplete) // eslint-disable-line
      })
    }
    // potreeのdestroy方法が不明なので、とりあえず残されたDOMを削除する
    document.querySelectorAll('#profile_window,.sp-container').forEach((e) => e.remove()) // eslint-disable-line
  },
  methods: {
    setControlMode(mode) {
      switch (mode) {
        case 0:
          // First Person
          window.viewer.setControls(window.viewer.fpControls)
          window.viewer.fpControls.lockElevation = true // 高さを維持するか否か
          break
        case 1:
          // Earth
          window.viewer.setControls(window.viewer.earthControls)
          break
        case 2:
          // Orbit
          window.viewer.setControls(window.viewer.orbitControls)
          break
      }
      // モードを保存
      this.$store.commit('controlMode', mode)
    },
    startCameraAnimation(index) {
      this.tours[index].play()
    },
    getAnnotationById(id, annotations) {
      const list = annotations.filter((a) => a.data.id === id)
      if (list.length) {
        return list[0]
      }
      console.error(`id=${id} のアノテーションが見つかりませんでした`)
    },
    prev(globalIndex) {
      let index = this.listDataIndexArray.indexOf(globalIndex) - 1
      if (index < 0) {
        index = this.listDataIndexArray.length - 1
      }
      this.showAnnotation(this.listDataIndexArray[index])
    },
    next(globalIndex) {
      let index = this.listDataIndexArray.indexOf(globalIndex) + 1
      if (this.listDataIndexArray.length <= index) {
        index = 0
      }
      this.showAnnotation(this.listDataIndexArray[index])
    },
    showAnnotation(globalIndex) {
      const annotation = window.viewer.scene.annotations.children[globalIndex]
      if (this.$store.getters.pageName.includes('Tour')) {
        annotation.click_inTour()
      } else {
        annotation.click()
      }
    },
    showAnnotationById(id) {
      const annotations = window.viewer.scene.annotations.children
      this.getAnnotationById(id, annotations).click()
    },
    clickAnnotation(e) {
      if (this.annotationData || this.listData) {
        this.drawerAlreadyOpened = true // あとで開く処理はスキップ
        this.clearSelectedAnnotation()
        // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
        this.$nextTick(() => {
          this.annotationData = e.target.data
          e.target.domElement.get(0).classList.add('highlighted')
        })
      } else {
        this.drawerAlreadyOpened = false // あとで開くのでここでは何もしない
      }
    },
    onCameraAnimationComplete(e) {
      if (this.drawerAlreadyOpened) {
        // 既にdrawerが開いているのでなにもしない
        return
      }
      this.clearSelectedAnnotation()
      // nextTickを使わないと、vue-youtubeがリロードされないので注意（next/prevなどで遷移した時にそのまま動画が再生されてしまう）
      this.$nextTick(() => {
        this.annotationData = e.target.data
        e.target.domElement.get(0).classList.add('highlighted')
      })
    },
    update() {
      const camera = window.viewer.scene.getActiveCamera()
      const pos = camera.position.toArray()
      if (this.annotations) {
        // ここでカメラポジションとの比較
        this.annotations.forEach((a) => {
          if (a.category === 'Plans') {
            // Plansのものは描画しない
            return
          }
          const annotationPos = new THREE.Vector3(...a.position)
          const distance = annotationPos.distanceTo(new THREE.Vector3(...pos)) // カメラとAnnotationとの距離
          const children = window.viewer.scene.annotations.children
          for (let i = 0; i < children.length; i++) {
            const _a = children[i]
            if (_a._title === a.title) {
              let val = 'middle'
              if (20 < distance) {
                val = 'far'
              } else if (distance <= 5) {
                val = 'nearer'
              } else if (distance <= 10) {
                val = 'near'
              }
              $(_a.domElement[0]).attr('data-camera-dist', val)
              break
            }
          }
        })
      }
    },
    selectList(name) {
      this.clearSelectedAnnotation()
      this.$store.commit('pageName', name)
      let list = []
      switch (name) {
        case 'Annotations':
          list = this.annotations
          break
        case 'Guided Tour':
          // guidedTourの順でannotationをリスト化する
          this.data.guidedTour.forEach((id) => {
            for (const a of this.annotations) {
              if (a.id === id) {
                list.push(a)
                return
              }
            }
          })
          break
        case 'Ramble Tour':
          // guidedTourの順でannotationをリスト化する
          list = _shuffle(this.annotations)
          break
        default:
          list = this.annotations.filter((a) => a.category.includes(name))
          break
      }
      this.listData = {
        name,
        list
      }
    },
    clearSelectedAnnotation() {
      this.annotationData = null
      // eslint-disable-next-line
      document.querySelectorAll('.annotation').forEach((m) => m.classList.remove('highlighted'))
    },
    closeDrawer() {
      // clear List
      this.$store.commit('tourName', null)
      this.$store.commit('pageName', '')
      this.clearSelectedAnnotation()
      this.listData = null
    },
    saveCameraInfo() {
      // const camera = window.viewer.scene.getActiveCamera()
      // this.$store.commit('cameraPosition', camera.position.toArray())
      // this.$store.commit('cameraTarget', ??) // TODO targetの取得方法
    },
    startRambleTourWithoutAnnotations() {
      this.$nuxt.$emit('showAnnotation', this.listData.list[0].index)
      if (this.rambleTourTimer) {
        clearInterval(this.rambleTourTimer)
      }
      this.rambleTourTimer = setInterval(() => {
        this.next(this.listData.list[this.currentIndex].index)
      }, 15000)
    },
    stopRambleTourWithoutAnnotations() {
      if (this.rambleTourTimer) {
        this.$store.commit('pageName', '')
        this.clearSelectedAnnotation()
        clearInterval(this.rambleTourTimer)
        this.rambleTourTimer = null
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'detail'
    }
  }
}
</script>
