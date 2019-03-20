cc.Class({
    extends: cc.Component,
    properties: {
        sprites: {
            type: cc.SpriteFrame,
            default: []
        },


    },

    onEnable() {
        //每次激活时，随机选择数字
        this.anim = this.node.getComponent(cc.Animation);
        var animState = this.anim.play('roll');
        
        this.anim.play();
       
        // this.Rndtouzi();
    },

    start() {

    },

    Rndtouzi() {//随机骰子

        var rnd = cc.random0To1() * 6;
        rnd = Math.floor(rnd);
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprites[rnd];
       
    }
})