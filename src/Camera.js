// Camera.js
class Camera {
    constructor() {
        this.eye = new Vector3([0, 1, -10]);
        this.at = new Vector3([0, 0, 100]);
        this.up = new Vector3([0, 1, 0]);
        this.speed = 0.5;
    }
    moveForward(distance = 0) {
        this.moveAlongViewDirection(this.speed + distance);
    }

    moveBackward(distance = 0) {
        this.moveAlongViewDirection(-this.speed - distance);
    }

    moveLeft() {
        this.movePerpendicularToViewDirection(this.speed);
    }

    moveRight() {
        this.movePerpendicularToViewDirection(-this.speed);
    }

    panLeft() {
        this.panAroundVerticalAxis(1);
    }

    panRight() {
        this.panAroundVerticalAxis(-1);
    }

    moveAlongViewDirection(distance) {
        let direction = new Vector3().set(this.at).sub(this.eye).normalize().mul(distance);
        this.eye.add(direction);
        this.at.add(direction);
    }

    movePerpendicularToViewDirection(distance) {
        let direction = new Vector3().set(this.at).sub(this.eye).normalize();
        let perpendicular = Vector3.cross(this.up, direction).normalize().mul(distance);
        this.eye.add(perpendicular);
        this.at.add(perpendicular);
    }

    panAroundVerticalAxis(angleIncrement) {
        let direction = new Vector3().set(this.at).sub(this.eye);
        let rotationMatrix = new Matrix4().setRotate(angleIncrement, 0, 1, 0);
        let newDirection = rotationMatrix.multiplyVector3(direction);
        this.at = newDirection.add(this.eye);
    }
}
