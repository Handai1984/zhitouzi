// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        help_scroll_node: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        //  var a = [1,2,3,4,5,6];
        //  var b = a;
        //  var c = a;
        // var sun = 0;
        // var count =0;
        //  for(var i = 0; i < a.length; i++) {

        //     for(var j = 0; j<b.length; j++) {


        //         for(var k = 0; k < c.length; k++){
        //             sun =a[i] + b[j] + c[k];
        //             if(sun ==5) {
        //                 cc.log(a[i]+' ' +b[j] +'' +c[k]);
        //                 sun = 0;
        //                 count ++;
        //             }
        //         }
        //     }
        //  }
        //  cc.log('总数：'+ count); //  var a = [1,2,3,4,5,6];
        // var a = [2, 6, 3, 2, 5];
        // var b = a;
        // var c = a;
        // var sun = 0;
        // var count = 0;
        // for (var i = 0; i < a.length; i++) {
        //     for (var j = i + 1; j < b.length; j++) {

        //         for (var k = j + 1; k < c.length; k++) {
        //             sun = a[i] + b[j] + c[k];
        //             // cc.log(sun);
        //             if (sun == 10) {
        //                 cc.log(a[i] + ' ' + b[j] + '' + c[k]);
        //                 sun = 0;
        //                 count++;
        //             }
        //         }
        //     }
        // }
        // cc.log('总数：' + count);//搞定，斗牛核心玩法初成，噢耶
    },

    freeplay() {
        cc.director.loadScene('freeplay');
    },

    TOplay() {
        cc.director.loadScene('21point');
    },

    cowplay() {
        cc.director.loadScene('cow');
    },

    helptext() {
        this.help_scroll_node.active = !this.help_scroll_node.active;
    },

    // update (dt) {},

    moregames() {
        cc.sys.openURL('https://play.google.com/store/apps/dev?id=4869921288501347163');
    },

    test() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
    },
    vidiotest() {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showReward","()V");

        var nPower = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "noAd","()F;");

    }
});
