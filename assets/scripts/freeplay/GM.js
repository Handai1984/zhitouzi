cc.Class({
    extends: cc.Component,

    properties: {
        helpText: cc.Node, //帮助说明
        startText: cc.Node, //开始游戏按钮
        powerText: cc.Node, //聚气按钮
        exText: cc.Node, //聚气特效
        playerNode: cc.Node, //玩家
        ex_01_Node: cc.Node, //玩家攻击特效
        ex_02_Node: cc.Node, //敌人攻击特效
        enemys: cc.Node,//敌人
        gamerestart: cc.Node,//游戏重新开始
        //sprite: [],

    },

    onLoad() {
       
       
        this.line = this.powerText.getComponent(cc.ProgressBar); //获取能量条
        this.line.progress = 0; //初始化能量条
        this.time = 0; //设置聚气时间
        this.iskillStart = true; //聚气按钮开关
        this.hide1 = cc.hide();//隐藏动画
        this.show1 = cc.show();//展示动画
        // this.ex_01_Node.runAction(this.hide1);
        this.anim_play = this.playerNode.getComponent(cc.Animation);//获取相对应的动画组件
        this.anim_ex1 = this.ex_01_Node.getComponent(cc.Animation);
        this.anim_ex2 = this.ex_02_Node.getComponent(cc.Animation);
        this.anim_enemy = this.enemys.getComponent(cc.Animation);
      
    },

    gameStart() { //游戏开始 帮助文档关闭，开始按钮关闭
        this.helpText.active = false;
        this.startText.active = false;
    },

    killStart() { //举起按钮点击开始聚气 特效开关打开
        this.iskillStart = false;
        this.exText.active = true;

    },

    attackStart() { //攻击按钮 聚气开始，如果在判定范围内，玩家攻击，否则，敌人攻击
        cc.log(this.time);
        this.iskillStart = true;
        if(this.time > 0.9 && this.time < 1.0) {

            this.player_attack_ex();
        }else {
            this.enemys_attack_ex();
            this.gameover();
        }

    },

    gameover() {//游戏结束
        cc.game.emit('gameover');
        this.iskillStart = true;
        this.gamerestart.active = true;
        
        this.gameinit();
    },
    gamerstart() {//重新开始游戏
        this.gamerestart.active = false;
    },
    gameinit() {//游戏初始化
        this.time = 0;
        this.line.progress = this.time
        this.exText.scale = 1;
    },

    player_attack_ex() { //玩家攻击动画
        this.anim_play.play();
        this.anim_ex1.play();
        this.anim_enemy.play();
        this.exText.scale = 1;
       this.exText.active = false;
       this.time = 0;
       this.line.progress = this.time
    },

    enemys_attack_ex() { //敌人攻击动画
        
        this.anim_ex2.play();
    },

    update(dt) {
        if (this.iskillStart) //聚气开始
            return;
        this.time += dt;
        if (this.time >= 1) { //聚气大于1，游戏结束
            // this.time = 0;
            // this.exText.scale = 1;
            //gameover
            this.gameover();
        }
        this.line.progress = this.time//能量条等于时间
        this.exText.scale += this.time * 0.01;//特效缩放

    }

})