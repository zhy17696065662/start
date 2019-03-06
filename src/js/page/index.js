require(['./js/config.js'],function(){
    require(['mui','bscroll'],function(mui,bscroll){
        var page=1,
        Bscroll,
        pageSize=4,
        aoto=0,
        type='',
        off='no',
        search='',
        ul=document.querySelector('.ul'),
        ol=document.querySelector('.ol'),
        shade=document.querySelector('.shade'),
        tops=document.querySelector('.tops'),
        bottoms=document.querySelector('.bottoms'),
        inp=document.querySelector('#inp'),
        btn=document.querySelector('#btn');
        init();
        function init(){
            Bscroll=new bscroll('footer',{
                probeType:2
            })
            mui.ajax('/find',{
                data:{
                    page:page,
                    pageSize:pageSize,
                    type:type,
                    search:search
                },
                dataType:'json',
                success:function(data){
                    console.log(data)
                    aoto=data.len;
                    if(data.code==1){
                        rander(data.data)
                    }
                }
            });
        }
        
        function rander(data){
            var html='';
            data.forEach(function(ele){
                html+=`<dl class="${off=='yes'?'bans':''}">
                <dt>
                    <img src="${ele.img}" alt="">
                </dt>
                <dd>
                    <h3>${ele.title}</h3>
                    <div>
                        <p>
                            <span>￥${ele.money}</span>
                            <span>${ele.sales}人付款</span>
                            <span>信用度:${ele.credit}</span>
                        </p>
                    </div>
                </dd>
            </dl>`
            })
            htmls.innerHTML+=html;
            Bscroll.refresh();
            
        }
        addevent()
        function addevent(){
            var lis=ul.querySelectorAll('li');
            lis.forEach(function(ele){
                ele.onclick=function(){
                    if(this.classList.contains('synthesize')){
                        ol.style.display='block';
                        shade.style.display='block';
                        ol.querySelectorAll('li').forEach(function(ele){
                            ele.onclick=function(){
                                type=this.dataset.type;
                                page=1;
                                htmls.innerHTML='';
                                ol.style.display='none';
                                shade.style.display='none';
                                init();
                            }
                        })
                    }else if(this.dataset.type=='sales'){
                        page=1;
                        htmls.innerHTML='';
                        type='sales';
                        init();
                    }else if(this.classList.contains('be')){
                        page=1;
                        var abc=document.querySelector('.htmls');
                        if(off=='no'){
                            off='yes';
                        }else{
                            off='no';
                        }
                        console.log(off)
                        var dls=abc.querySelectorAll('dl');
                        abc.classList.toggle('bans')
                        dls.forEach(function(e){
                            e.classList.toggle('bans')
                        })
                        htmls.innerHTML='';
                        init();
                        
                    }
                }
            })
           
            Bscroll.on('scroll',function(){
                if(page<aoto){
                    if(this.y<this.maxScrollY-bottoms.offsetHeight){
                        bottoms.classList.add('fide');
                        bottoms.innerHTML='释放加载更多...';
                    }else{
                        bottoms.classList.remove('fide');
                        bottoms.innerHTML='下拉加载';
                    } 
                }
                if(this.y>tops.offsetHeight){
                    tops.classList.add('fide');
                    tops.innerHTML='释放刷新';
                }else{
                    tops.classList.remove('fide');
                    tops.innerHTML='上拉刷新';
                } 
            })
            Bscroll.on('touchEnd',function(){
                if(bottoms.classList.contains('fide')){
                    console.log(page,aoto)
                    page++;
                    if(page<=aoto){
                        init()
                    }else{
                        bottoms.innerHTML='没有更多数据';
                    }
                    
                }
            })
            btn.onclick=function(){
                var val=inp.value;
                search=val;
                page=1;
                htmls.innerHTML='';
                init();
            }
        }
    })
})