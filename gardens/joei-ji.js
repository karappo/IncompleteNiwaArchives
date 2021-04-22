import Image1 from '../assets/image/test@2x.jpg'
export default {
  async addImages() {
    const images = await Potree.OrientedImageLoader.load(
      '/orientedImage/cameraParams.xml',
      '/orientedImage/imageParams.txt',
      window.viewer
    )
    window.viewer.scene.addOrientedImages(images)
  },
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(-45.509, 48.096, 26.978)
    window.viewer.scene.view.lookAt(new THREE.Vector3(-34.27, 25.369, -2.105))
  },
  annotations: [
    {
      title: '珪質片岩',
      position: [-29.256, 30.302, -1.795],
      cameraPosition: [-33.528, 33.86, -1.395],
      cameraTarget: [-29.256, 30.302, -1.795],
      image: Image1
    },
    {
      title: '人々',
      position: [-41.541, 23.433, -1.902],
      cameraPosition: [-35.968, 26.991, 1.812],
      cameraTarget: [-41.541, 23.433, -1.902],
      description:
        'テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。'
    },
    {
      title: 'テスト',
      position: [-38.034, 27.38, -2.082],
      cameraPosition: [-35.968, 26.991, 1.812],
      cameraTarget: [-38.034, 27.38, -2.082],
      description:
        'テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。'
    },
    {
      title: '屋根の先ッチョ',
      position: [-41.515, 25.681, 2.944],
      cameraPosition: [-35.968, 26.991, 1.812],
      cameraTarget: [-41.515, 25.681, 2.944],
      description:
        'テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。テストの文章。'
    }
  ],
  animations: [
    {
      positions: [
        [-45.509, 48.096, 26.978],
        [-45.705, 13.655, -1.111],
        [-43.002, 7.955, -1.188],
        [5.121, -6.388, 10.691]
      ],
      targets: [
        [-34.27, 25.369, -2.105],
        [-44.209, 10.512, -2.616],
        [-41.335, 7.212, -1.703],
        [-23.185, 22.343, -13.972]
      ]
    },
    {
      positions: [
        [1.815, 6.278, 3.947],
        [2.702, 24.751, 1.87],
        [-1.243, 35.463, 4.325],
        [-19.15, 26.003, 1.441],
        [-30.24, 12.747, -1.112]
      ],
      targets: [
        [-16.065, 14.824, -1.693],
        [-15.38, 19.475, 3.352],
        [-17.681, 23.136, 1.38],
        [-23.223, 24.71, -0.927],
        [-28.402, 22.346, -0.679]
      ]
    }
  ]
}
