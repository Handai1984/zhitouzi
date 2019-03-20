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
        cc.log('heiheihei');
        
        this.anim.play();
       this.score = 0;
        // this.Rndtouzi();
    },

    start() {
        this.pos = cc.p(this.node.x,this.node.y);
        this.count = 10;
        this.ismove = false;
    },

    Rndtouzi() {//随机骰子

        var rnd = cc.random0To1() * 6;
        rnd = Math.floor(rnd);
       // cc.log(rnd);
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprites[rnd];
       this.score = rnd +1;
    },


    Score() {
        return this.score;
    },
    Pos() {
        return this.pos;
    },

    notouch(a) {
        var button = this.node.getComponent(cc.Button);
        button.interactable = a;
    }

    



})