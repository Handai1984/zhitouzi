cc.Class({
    extends: cc.Component,

    properties: {
        //cent_point: cc.Node,
        start_node: cc.Node,
        onemore_node: cc.Node,
        enough_node: cc.Node,
        dice_lab: cc.Label,
        score_lab: cc.Label,
        endenough_node: cc.Node,
        endscore_lab: cc.Label,
        win_node: cc.Node,
        lose_node: cc.Node,
        restart_node: cc.Node,
        
    },

    start() {
        this.touzis = this.node.children;//获取所有子节点
        this.touzi_num = 0;
        this.score = 0;//得分
        this.dice_lab.string = this.touzi_num;
        this.score_lab.string = this.score;
    },

    ShowOneTouzi() {
        //点击开始，如果超出数组或者骰子在移动，返回
        if (this.touzi_num >= this.touzis.length || this.isend == true) return;
        this.isend = true;
        var touzi = this.touzis[this.touzi_num];//获取当前骰子，把当前的坐标换成父节点中间坐标
        //播放完动画以后，移动到原来位置，结束
        var touzirnd = touzi.getComponent('touzirnd');
        var c_x = touzi.x;
        var c_y = touzi.y;
        touzi.x = this.node.x;
        touzi.y = this.node.y;
        touzi.scale = cc.p(1, 1);
        touzi.active = true;
        var fuc = cc.callFunc(function () {
            this.isend = false;
            var score = touzirnd.Score();
            this.score += score;
            this.score_lab.string = this.score;
            if(this.score >= 21) {
                this.endGame();
            }
            cc.log('score: ' + score);
        }, this);
        var act = cc.moveTo(1.5, cc.p(touzi.x, touzi.y));
        var act1 = cc.moveTo(1, cc.p(c_x, c_y));
        var act2 = cc.scaleTo(1, 1.5, 1.5);//动画边大小
        var spawn = cc.spawn(act1, act2);
        var seq = cc.sequence(act, spawn, fuc);
        touzi.runAction(seq);
        //var score = touzirnd.Rndtouzi();
        // score = score +1;
        // cc.log(score);
        this.touzi_num++;
        // this.score += score ;//todo?
        this.dice_lab.string = this.touzi_num;
    },

    OneMore() {
       
           this.ShowOneTouzi();
        
    },
    startGame() {
        this.ShowOneTouzi();
        this.onemore_node.active = true;
        this.enough_node.active = true;
        this.start_node.active = false;
    },

    endGame() {
        if(this.isend) return;
       
           this.endenough_node.active = true;
           this.endscore_lab.string = this.score + '';
        if (this.score == 21) {
            this.win_node.active = true;
        } else if(this.score > 21) {
          this.lose_node.active = true;
        }
        this.restart_node.active = true;
    },

    RestartGame() {
        cc.director.loadScene('21point');
        this.rndShowAD();//显示插屏
        cc.log('1');
    },

    returnMenu() {
        cc.director.loadScene('menu');
    },

    rndShowAD() {
        var rnd = cc.random0To1() * 1 + 1;
        rnd = Math.floor(rnd);
        if(rnd == 1) {
            if(cc.sys.OS_ANDROID == cc.sys.os) {

                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
            } else if(cc.sys.OS_IOS == cc.sys.os) {
                jsb.reflection.callStaticMethod("AppController", "game2NativeShow");//ios
            }
        }
    }



})