cc.Class({
    extends: cc.Component,
    properties: {
        num: 4,
        num_display: cc.Label,
        // start_node: cc.Node,//打开骰子
        zhongshai_node: cc.Node,//骰盅
        dipan_node: cc.Node,//地盘
        restart_node: cc.Node,//重新开始
        // shake_node: cc.Node,//摇骰子
        numbers_node: cc.Node,//
        // score_lab: cc.Label,测试专用
        // x_lab: cc.Label,
        // y_lab: cc.Label,
        audio: cc.AudioSource,

    },
    onLoad() {

        cc.inputManager.setAccelerometerEnabled(true);
        this.onOpenEvent();
    },

    start() {
        this.Disnumbers();
        this.arr = [];
        this.touzi = this.node.children;
        cc.log(this.touzi.length);
        this.score = 0;




    },
    testAudio() {
        this.audio.play();
    },


    getNumNoRepeat() {//获得随机数
        var maxTimes = 20;
        do {
            var num = Math.floor(Math.random() * this.touzi.length);
            if (-1 == this.arr.indexOf(num)) {//数组中不存在
                this.arr.push(num);
                this.touzi[num].active = true;//显示数字
                cc.log(num);
                return num;
            }
            maxTimes--;
        } while (maxTimes)
    },

    touzi_add() {
        this.num++;
        if (this.num > 10) {
            this.num = 10;
            return;
        }
        this.Disnumbers();
    },

    touzi_sub() {
        this.num--
        if (this.num < 1) {
            this.num = 1;
            return;
        }
        this.Disnumbers();
    },
    Disnumbers() {
        this.num_display.string = this.num + "";

    },
    getshaizi() {
        for (let index = 0; index < this.num; index++) {
            this.getNumNoRepeat();

        }
    },

    openshaizi() {
        this.zhongshai_node.active = false;
        this.dipan_node.active = true;
        this.restart_node.active = true;

        this.getshaizi();
    },

    datareset() {
        for (let index = 0; index < this.touzi.length; index++) {
            this.touzi[index].active = false;

        }
        this.arr.length = 0;
    },

    restartshaizi() {
        // this.onOpenEvent();
        // this.datareset();
        // this.numbers_node.active = true;
        // this.zhongshai_node.active = true;
        // this.zhongshai_node.x = 0;
        // this.zhongshai_node.y = 0;
        // this.shake_node.active = true;
        // this.dipan_node.active = false;
        // this.restart_node.active = false;
        cc.director.loadScene('freeplay');
        this.rndShowAD();
    },


    returnMenu() {
        cc.director.loadScene('menu');
    },

    onDeviceMotionEvent: function (event) {
        var nowGX = event.acc.x.toFixed(2);
        var nowGY = event.acc.y.toFixed(2);
        var nowGZ = event.acc.z.toFixed(2);
        // this.x_lab.string = nowGX;测试专用
        // this.y_lab.string = nowGY;
        if (nowGX <= -2) {
            this.onDestroy();
            this.audio.play();
            this.numbers_node.active = false;
            //骰盅动画
            var endcall = cc.callFunc(this.openshaizi, this);
            var seq = cc.sequence(cc.repeat(
                cc.sequence(
                    cc.moveBy(0.01, 50, 0),
                    cc.moveBy(0.01, -50, 0)
                ), 100), endcall);
            this.zhongshai_node.runAction(seq);
        }




    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    onOpenEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    rndShowAD() {
        var rnd = cc.random0To1() * 1 + 1;
        rnd = Math.floor(rnd);
        if (rnd == 1) {
            if(cc.sys.OS_ANDROID == cc.sys.os) {

                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
            } else if(cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
            }
        }
        
    }
})