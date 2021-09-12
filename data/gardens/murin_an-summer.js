export default {
  title: 'Murin-an Garden - Summer',
  pointcloud: '/pointclouds/MurinanS_0.01.las_converted/metadata.json',
  addImages() {
    // do nothing
  },
  initCamera() {
    // viewer.fitToScreen()
    window.viewer.scene.view.position.set(171.85, -48.743, -4.652)
    window.viewer.scene.view.lookAt(new THREE.Vector3(170.578, -51.43, -5.052))
  },
  guidedTour: [],
  tours: [
    {
      positions: [
        [-17.371, 14.113, 6.617],
        [-21.396, 6.723, 7.492],
        [-16.811, -0.786, 7.492],
        [-8.041, -1.491, 7.492],
        [-2.316, 5.19, 7.492]
      ],
      targets: [
        [-11.611, 7.547, -0.679],
        [-12.019, 6.813, -0.533],
        [-11.56, 6.062, -0.533],
        [-10.683, 5.991, -0.533],
        [-10.111, 6.659, -0.533]
      ]
    }
  ]
}
