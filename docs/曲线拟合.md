# 曲线拟合
通过一组点，拟合成Line或Tube,两点拟合成直线
## 二维点数据
```
    const splineCurve = new THREE.SplineCurve(vector2Array);

    const sp = splineCurve.getPoints(500);

    const geometry = new THREE.BufferGeometry().setFromPoints(sp);

```
## 三维点数据
```
    const curve = new THREE.CatmullRomCurve3(vector3Array);

    const cps = curve.getPoints(500);

    const geometry = new THREE.BufferGeometry().setFromPoints(cps);

    //或
    const geometry_1 = new THREE.TubeGeometry(curve, 500, 0.4, 8, false);  
```
