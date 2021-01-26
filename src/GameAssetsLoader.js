import { app } from './index';
export default class GameAssetsLoader {

    constructor() {

    };

    loadAssets = () => {
        // console.log('Load Assets');
        app.loader.baseUrl = "./assets";
        app.loader
            .add("playerShip", "Ships/playerShip.png")
            .add("enemyYellow", "Ships/enemyYellow.png")
            .add("enemyBlue", "Ships/enemyBlue.png")
            .add("enemyRed", "Ships/enemyRed.png")
            .add("playerBullet", "Bullets/playerBullet.png")
            .add("enemyBullet", "Bullets/enemyBullet.png")
            .add("foreground", "Mountains/foreground_mountains.png")
            .add("midground", "Mountains/midground_mountains.png")
            .add("farground", "Mountains/farground_mountains.png")
            .add("rock1", "Obstacles/rock1.png")
            .add("rock2", "Obstacles/rock2.png")
            .add("rock3", "Obstacles/rock3.png")
            .add("rock4", "Obstacles/rock4.png")
            .add("rock5", "Obstacles/rock5.png")
            .add("rock6", "Obstacles/rock6.png")
            .add("rock7", "Obstacles/rock7.png")
            .add("expl1", "Explosion/keyframes/explosion_01.png")
            .add("expl2", "Explosion/keyframes/explosion_02.png")
            .add("expl3", "Explosion/keyframes/explosion_03.png")
            .add("expl4", "Explosion/keyframes/explosion_04.png")
            .add("expl5", "Explosion/keyframes/explosion_05.png")
            .add("expl6", "Explosion/keyframes/explosion_06.png")
            .add("expl7", "Explosion/keyframes/explosion_07.png")
            .add("expl8", "Explosion/keyframes/explosion_08.png")
            .add("expl9", "Explosion/keyframes/explosion_09.png");
        for (let i = 1; i <= 30; ++i) {
            app.loader.add(`live${i}`, `BonusLive/live${i}.png`);
        };


        app.loader.onProgress.add(this.showProgress);
        app.loader.onComplete.add(() => this.doneLoading(app));
        app.loader.onError.add(this.reportError);

        app.loader.load();
        app.stage.interactive = true;
    };

    showProgress = (e) => {
        console.log(e.progress);
    };
    reportError = (e) => {
        console.log('ERROR : ' + e.message);
    };

    doneLoading = () => {
        console.log('DONE LOADING!!!');
    };
};