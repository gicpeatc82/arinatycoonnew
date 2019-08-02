/*
*
* SOLID [MANUAL] COLOURS VERSION
*
* TODO
*
* [!] The colors can be adjusted to match with the picture attached.
*     Same picture in the Horse link.
*
*     colorAdjustment = { r: 0.1 , g: 0.1 , b: 0.1 };
*
* [x] Is there anyway you can trim the ears (brown) coming into the triangle
*     (white) as shown in the screenshot below? I just want the white triangle
*     to be visible clearly.
*
* [!] Can you reduce the movement of the horse, especially when cursor goes down?
*     The object almost flips upside down.
*
*     movementRatio = 0.5;
*
* [-] planned, [x] done, [x] see comments
*
* @author   Vladimir V KUCHINOV
* @email    helloworld@vkuchinov.co.uk
*
*/

var movementRatio = { x: 0.5, y: 0.2 };
// var colorAdjustment = { r: doColorAdjustment("633E13")[0] , g: doColorAdjustment("633E13")[1] , b: doColorAdjustment("633E13")[2] };
var colorAdjustment = { r: 0.388 , g: 0.243, b: 0.074};
var backgroundTransparency = 0.0; // 0.0: transparent, 1.0: opaque

var container;

var camera, scene, renderer, raycaster, group, helper, animal;
var sphere;
var mouse = new THREE.Vector2(0.0, 0.0, 0.0);

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// var palette = [ { name: "general", color: new THREE.Color(0xFFFFFF) },
//                 { name: "eyes", color:  new THREE.Color(0xFF00FF) },
//                 { name: "ears", color:  new THREE.Color(0x00FFFF) },
//                 { name: "horns", color:  new THREE.Color(0xFFFF00) },
//                 { name: "shade1", color:  new THREE.Color(0xDDDDDD) }
//               ];

init();
animate();


function init() {

    // container = document.createElement( 'div' );
    // console.log(document.getElementById('horse-logo'));
    // console.log(document.body);
    // document.getElementById('horse-logo').appendChild( container );
    container = document.getElementById('horse-logo');

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 250;

    scene = new THREE.Scene();

    group = [];
    var helper = new THREE.Mesh(new THREE.PlaneGeometry( 1000, 1000, 1, 1 ), new THREE.MeshBasicMaterial( {color: 0x0000FF, side: THREE.DoubleSide} ));
    group.push(helper);

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.25 );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    pointLight.castShadow = true;
    camera.add( pointLight );

    scene.add( camera );

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( 'assets/horse.obj', function ( object ) {

        animal = new THREE.Object3D;

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

            var hex = child.material.name;
            child.material = new    THREE.MeshLambertMaterial();
            child.material.color.set( doColorAdjustment(hex) );

            child.geometry.translate(0, -10, 0);
            child.geometry.scale(2.0, 2.0, 2.0);
            child.geometry.computeFaceNormals();

            }

        } );

        object.castShadow = true;
        object.receiveShadow = true;

        animal.add( object );
        scene.add( animal );

    }, onProgress, onError );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio*2 );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    renderer.setClearColor(0x000000, backgroundTransparency);
    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    raycaster = new THREE.Raycaster();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 4;
    windowHalfY = window.innerHeight / 4;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    var position = new THREE.Vector3();

    raycaster.setFromCamera( mouse, camera );

    var intersections = raycaster.intersectObjects( group );
    intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;
    if ( intersection !== null) { position.copy( intersection.point ); }

    position.z = 25;

    position.x *= movementRatio.x;
    position.y *= movementRatio.y;

    if(animal != undefined) animal.lookAt(position);

    renderer.render( scene, camera );

}

function doColorAdjustment(color_){

    var c = hexToRgb(color_);
    return new THREE.Color( c.r + colorAdjustment.r, c.g + colorAdjustment.g, c.b + colorAdjustment.b );
    //return new THREE.Color( 0.7, 0.7, 0.7 );

}

function hexToRgb(hex_) {

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    } : null;

}
