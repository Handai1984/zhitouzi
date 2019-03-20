cc.Class({
    extends: cc.Component,
    properties:{
        shake_node: cc.Node,
        start_node: cc.Node,
        numbers_node: cc.Node,
    },


    shake() {
        this.shake_node.active  = false;
        this.numbers_node.active = false;
        this.start_node.active = true;
        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(0.01, 50, 0),
                cc.moveBy(0.01, -50, 0)
            ));

            this.node.runAction(seq);
    },
    onDisable() {
        this.node.stopAllActions();
    }
    
})