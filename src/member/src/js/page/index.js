require(['./js/config.js'], function() {
    require(['mui', 'dom'], function(mui, dom) {
        var pagenum = 0, //加载第几页数据
            pagesize = 4, //每次加载几条
            total; //总页数
        mui.init({
            //上拉加载
            pullRefresh: {
                container: '#pullrefresh',
                up: {
                    auto: true,
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });

        function pullupRefresh() {
            //为解决重复加载问题
            setTimeout(function() {
                pagenum++;
                //请求数据
                getUserlist();
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(total == pagenum); //参数为true代表没有更多数据了。
            }, 1000);
        }
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005
        });
        //请求数据
        function getUserlist() {
            mui.ajax('/users', {
                dataType: 'json',
                data: {
                    pagenum: pagenum,
                    pagesize: pagesize
                },
                success: function(res) {
                    if (res.code === 1) {
                        renderList(res.data);
                        total = res.total;
                    }
                }
            });
        }
        //渲染列表
        function renderList(data) {
            var html = '';
            data.forEach(function(item) {
                html += `<li class="mui-table-view-cell" data-id="${item.id}">
							${item.name}
							<div class="btns">
								<button type="button" class="mui-btn mui-btn-primary" data-id="${item.id}">
								查看详情
								</button>
								<button type="button" class="mui-btn mui-btn-danger" data-id="${item.id}">
								删除
								</button>
							</div>
						</li>`;
            });
            dom('.list').innerHTML += html;
        }
        //添加成员
        dom('.mui-icon-plus').addEventListener('tap', function() {
            location.href = '../../page/add.html';
        });
        //查看详情
        mui('.list').on('tap', '.mui-btn-primary', function() {
            var id = this.getAttribute('data-id');
            location.href = '../../page/detail.html?id=' + id;
        });
        //点击删除
        mui('.list').on('tap', '.mui-btn-danger', function() {
            var that = this;
            var id = this.getAttribute('data-id');
            if (id <= 6) {
                mui.toast('此傻蛋不能被移除！');
            } else {
                mui.confirm('是否确认移除傻蛋列表？', '提示', ['取消', '确定'], function(data) {
                    if (data.index === 1) {
                        mui.ajax('/users/api/delete', {
                            data: {
                                id: id
                            },
                            dataType: 'json',
                            success: function(res) {
                                if (res.code === 1) {
                                    alert(res.msg);
                                    dom('.list').removeChild(that.parentNode.parentNode)
                                }
                            }
                        })
                    }
                })
            }
        });
    })
})