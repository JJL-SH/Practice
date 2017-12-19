import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactSwipe from 'react-swipe';

const navs = [
  {
    title: '美食',
    link: '美食',
    img: '//www.dpfile.com/sc/eleconfig/20160126194705meishi.png'
  },
  {
    title: '猫眼电影',
    link: '猫眼电影',
    img: '//www.dpfile.com/sc/eleconfig/20170223152109dp_wx_maoyan_icon.png'
  },
  {
    title: '酒店',
    link: '酒店',
    img: '//www.dpfile.com/sc/eleconfig/20160126203337jiudian.png'
  },
  {
    title: '休闲娱乐',
    link: '休闲娱乐',
    img: '//www.dpfile.com/sc/eleconfig/20160126202841xiuxianyule.png'
  },
  {
    title: '外卖',
    link: '外卖',
    img: '//www.dpfile.com/sc/eleconfig/20160126203251waimai.png'
  },
  {
    title: '火锅',
    link: '火锅',
    img: '//www.dpfile.com/sc/eleconfig/20160204172927huoguo.png'
  },
  {
    title: '丽人',
    link: '丽人',
    img: '//www.dpfile.com/sc/eleconfig/20160126202946liren.png'
  },
  {
    title: '购物',
    link: '购物',
    img: '//www.dpfile.com/sc/eleconfig/20160314121215icongouwu135.png'
  },
  {
    title: '周边游',
    link: '周边游',
    img: '//www.dpfile.com/sc/eleconfig/20160126203440zhoubianyou.png'
  },
  {
    title: 'KTV',
    link: 'KTV',
    img: '//www.dpfile.com/sc/eleconfig/20160126203542ktv.png'
  },
  {
    title: '婚纱摄影',
    link: '/婚纱摄影',
    img: '//www.dpfile.com/sc/eleconfig/20160126203830jiehun.png'
  }, {
    title: '生活服务',
    link: '/生活服务',
    img: '//www.dpfile.com/sc/eleconfig/20170223152109dp_wx_maoyan_icon.png'
  }, {
    title: '景点',
    link: '/景点',
    img: '//www.dpfile.com/sc/eleconfig/20160126203337jiudian.png'
  }, {
    title: '爱车',
    link: '/爱车',
    img: '//www.dpfile.com/sc/eleconfig/20160126203742aiche.png'
  }, {
    title: '运动健身',
    link: '/运动健身',
    img: '//www.dpfile.com/sc/eleconfig/20160126203617jianshen.png'
  }, {
    title: '亲子',
    link: '/亲子',
    img: '//www.dpfile.com/sc/eleconfig/20160126203905qinzi.png'
  }, {
    title: '家装',
    link: '/家装',
    img: '//www.dpfile.com/sc/eleconfig/20171009183850zhaungxiugongsi.png'
  }, {
    title: '学习培训',
    link: '/学习培训',
    img: '//www.dpfile.com/gp/cms/1455525720807.png'
  }, {
    title: '医疗健康',
    link: '/医疗健康',
    img: '//www.dpfile.com/sc/eleconfig/20160126204327yiliao.png'
  }, {
    title: '到家',
    link: '/到家',
    img: '//www.dpfile.com/sc/eleconfig/20160126203812daojia.png'
  }, {
    title: '小吃快餐',
    link: '/小吃快餐',
    img: '//www.dpfile.com/sc/eleconfig/20160204173331xiaochikuaican.png'
  }, {
    title: '自助餐',
    link: '/自助餐',
    img: '//www.dpfile.com/sc/eleconfig/20160204173511zizhucan.png'
  }, {
    title: '日本菜',
    link: '/日本菜',
    img: '//www.dpfile.com/sc/eleconfig/20160415121719rihanliaoli.png'
  }, {
    title: '美发',
    link: '/美发',
    img: '//www.dpfile.com/sc/eleconfig/20160316142804meifa.png'
  }, {
    title: '美甲美睫',
    link: '/美甲美睫',
    img: '//www.dpfile.com/sc/eleconfig/20160316143047meijia.png'
  }, {
    title: '美容SPA',
    link: '/美容SPA',
    img: '//www.dpfile.com/sc/eleconfig/20160316143239meirong.png'
  }, {
    title: '瘦身纤体',
    link: '/瘦身纤体',
    img: '//www.dpfile.com/sc/eleconfig/20160316143316shoushen.png'
  }, {
    title: '亲子摄影',
    link: '/亲子摄影',
    img: '//www.dpfile.com/sc/eleconfig/20160316143612qinzisheying.png'
  }, {
    title: '亲子游乐',
    link: '/亲子游乐',
    img: '//www.dpfile.com/sc/eleconfig/20160316143656qinziyoule.png'
  }, {
    title: '全部分类',
    link: '/全部分类',
    img: '//www.dpfile.com/sc/eleconfig/20160125182200more.png'
  }
]


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: 0
    }
  }

  _handleSwipe = (navActive) => {
    this.setState({navActive})
  }
  render() {
    const state = this.state;
    let navsArray = [];

    navs.forEach((nav, index) => {
      let mainIndex = Math.floor(index/10);
      // 如果当前索引没有数据则初始化一个空数组
      navsArray[mainIndex] || (navsArray[mainIndex] = []);
      // 把当前push进指定索引的数组中
      navsArray[mainIndex].push(<Link
        className="pHome__nav-item"
        key={index}
        to={nav.link}
      >
        <img src={nav.img} width="44" height="44"/>
        <div>{nav.title}</div>
      </Link>);
    })

    return(
      <div className="pHome__nav">
        <div className="pHome__nav-wrap">
          <ReactSwipe
            swipeOptions={{
              continuous: false,
              callback: this._handleSwipe
            }}
          >
            {
              navsArray.map((navs, index) => {
                return <div className="pHome__nav-block" key={index}>{navs}</div>;
              })
            }
          </ReactSwipe>
          <ul className="pHome__nav-menu">
            {
              navsArray.map((navs, index) => {
                return <li key={index} className={(state.navActive === index) && 'pHome__nav-menu--active' || ''}></li>;
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;