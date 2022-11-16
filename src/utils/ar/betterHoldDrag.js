export default function (aframeInstance) {
    aframeInstance.registerComponent('better-hold-drag', {
        schema: {
            cameraId: {
                default: 'camera',
            },
            groundId: {
                default: 'ground',
            },
            dragDelay: {
                default: 300,
            },
            riseHeight: {
                default: 1,
            },
        },
        init() {
            /** @type {(Element|null)} */
            this.camera = document.getElementById(this.data.cameraId)
            if (!this.camera) {
                throw new Error(`[better-hold-drag] Couldn't find camera with id '${this.data.cameraId}'`)
            }
            this.threeCamera = this.camera.getObject3D('camera')
            /** @type {(Element|null)} */
            this.ground = document.getElementById(this.data.groundId)
            if (!this.ground) {
                throw new Error(`[better-hold-drag] Couldn't find ground with id '${this.data.groundId}'`)
            }
            this.internalState = {
                fingerDown: false,
                dragging: false,
                distance: 0,
                startDragTimeout: null,
                //eslint-disable-next-line no-undef
                raycaster: new THREE.Raycaster(),
            }
            this.fingerDown = this.fingerDown.bind(this)
            this.startDrag = this.startDrag.bind(this)
            this.fingerMove = this.fingerMove.bind(this)
            this.fingerUp = this.fingerUp.bind(this)
            this.el.addEventListener('mousedown', this.fingerDown)
            this.el.sceneEl.addEventListener('onefingermove', this.fingerMove)
            this.el.sceneEl.addEventListener('onefingerend', this.fingerUp)
            this.el.classList.add('cantap')
            this.initialHeight = this.el.object3D.position.y
        },
        tick() {
            if (this.internalState.dragging) {
                let d = null
                if (this.internalState.positionRaw) {
                    const u2 = (this.internalState.positionRaw.x / document.body.clientWidth) * 2 - 1
                    const _canvasHeightHalf = (this.internalState.positionRaw.y / document.body.clientHeight) * 2 - 1

                    //eslint-disable-next-line no-undef
                    const vector = new THREE.Vector2(u2, -_canvasHeightHalf)
                    this.threeCamera = this.threeCamera || this.camera.getObject3D('camera')
                    this.internalState.raycaster.setFromCamera(vector, this.threeCamera)
                    const expRecords = this.internalState.raycaster.intersectObject(this.ground.object3D, true)
                    if (expRecords.length > 0) {
                        const self = expRecords[0]
                        this.internalState.distance = self.distance
                        d = self.point
                    }
                }
                if (!d) {
                    //eslint-disable-next-line no-undef
                    d = this.camera.object3D.localToWorld(new THREE.Vector3(0, 0, -this.internalState.distance))
                }
                d.y = this.data.riseHeight
                this.el.object3D.position.lerp(d, 0.2)
            }
        },
        remove() {
            this.el.removeEventListener('mousedown', this.fingerDown)
            this.el.sceneEl.removeEventListener('onefingermove', this.fingerMove)
            this.el.sceneEl.removeEventListener('onefingerend', this.fingerUp)
            if (this.internalState.fingerDown) {
                this.fingerUp()
            }
        },
        fingerDown(e) {
            /** @type {boolean} */
            this.internalState.fingerDown = true
            /** @type {number} */
            this.internalState.startDragTimeout = setTimeout(this.startDrag, this.data.dragDelay)
            this.internalState.positionRaw = e.detail.positionRaw
        },
        //eslint-disable-next-line no-unused-vars
        startDrag(snapToCenter) {
            if (this.internalState.fingerDown) {
                /** @type {boolean} */
                this.internalState.dragging = true
                this.internalState.distance = this.el.object3D.position.distanceTo(this.camera.object3D.position)
            }
        },
        fingerMove(e) {
            this.internalState.positionRaw = e.detail.positionRaw
        },
        //eslint-disable-next-line no-unused-vars
        fingerUp(e) {
            this.internalState.fingerDown = false
            clearTimeout(this.internalState.startDragTimeout)
            this.internalState.positionRaw = null
            if (this.internalState.dragging) {
                const globalBonePosition = this.el.object3D.position.clone()
                this.el.setAttribute('animation__drop', {
                    property: 'position',
                    to: `${globalBonePosition.x} ${this.initialHeight} ${globalBonePosition.z}`,
                    dur: 300,
                    easing: 'easeOutQuad',
                })
            }
            /** @type {boolean} */
            this.internalState.dragging = false
        },
    })
}