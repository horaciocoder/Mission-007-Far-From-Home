class Ground extends BaseClassModule {
    constructor(x, y, width, height) {
        super(x, y, width, height, {isStatic: true}, "Rect", null);
    }
    display() {
        super.display();
    }
}