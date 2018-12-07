var gulp = require('gulp');
var server = require('gulp-webserver');
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090, 
			host:'172.23.46.15',
            proxies: [{
                source: '/users',
                target: 'http://172.23.46.15:3000/users'
            },{
                source: 'users/api/add',
                target: 'http://172.23.46.15:3000/users/api/add'
            },{
                source: 'users/api/detail',
                target: 'http://172.23.46.15:3000/users/api/detail'
            },{
                source: 'users/api/update',
                target: 'http://172.23.46.15:3000/users/api/update'
            },{
                source: 'users/api/delete',
                target: 'http://172.23.46.15:3000/users/api/delete'
            }]
        }));
})