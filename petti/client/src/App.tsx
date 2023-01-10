import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import NavBar from './Components/views/NavBar/NavBar';
import LoginPage from './Components/views/LoginPage/LoginPage';
import RegisterPage from './Components/views/RegisterPage/RegisterPage';
import Board from './Components/views/Board/Board';
import Gallery from './Components/views/Gallery/Gallery';
import GalleryUpload from './Components/views/Gallery/GalleryUpload';
import Goods from './Components/views/Goods/Goods';
import GoodsUpload from './Components/views/Goods/GoodsUpload';
import Health from './Components/views/Health/Health';
import Together from './Components/views/Together/Together';
import Home from './Components/views/Home/Home';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isTabletSize } from './atoms';
import { ITableSize } from './api';
import { device } from './Components/utils/Size';
import Auth from './hoc/auth';
import GalleryDetailPage from './Components/views/Gallery/GalleryDetailPage';
import MyPage from './Components/views/My/MyPage';
import Cart from './Components/views/My/Cart';

const Wrapper = styled.div<ITableSize>`
  background-color: ${(props) => props.theme.light.darker};
  color: ${(props) => props.theme.dark.darker};
  padding: 5.6rem 1.6rem 0 1.6rem;
`

function App() {
  const isTabletMode = useRecoilValue(isTabletSize);
  const setTabletSize = useSetRecoilState(isTabletSize);
  const resizeHandler = () => {
    if(window.outerWidth > +device.tablet.replace(/[^0-9]/g, "")){//ww가 큼
      setTabletSize("pc");
    }else if(window.outerWidth < +device.mobileL.replace(/[^0-9]/g, "")){
      setTabletSize("mobile");
    }else{
      setTabletSize("tablet")
    }
  }
  useEffect(() => {
    const ww = window.outerWidth;
    const tw = +device.tablet.replace(/[^0-9]/g, "")
    const mw = +device.mobileL.replace(/[^0-9]/g, "")
    if(ww > tw){
      setTabletSize("pc")
    }else if(ww < mw){
      setTabletSize("mobile")
    }else{
      setTabletSize("tablet")
    }
    window.addEventListener('resize', resizeHandler)
  
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  //console.log(isTabletMode);
  
  return (
    <BrowserRouter>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <Wrapper winSize={isTabletMode} >
          <Switch>
            {/*  null -> anybody, false -> not login, true -> only login  */}
            <Route exact path="/" component={Auth(Home, null)} />
            <Route exact path="/gallery" component={Auth(Gallery, null)} />
            <Route exact path="/health" component={Auth(Health, null)} />
            <Route exact path="/goods" component={Auth(Goods, null)} />
            <Route exact path="/together" component={Auth(Together, null)} />
            <Route exact path="/board" component={Auth(Board, null)} />
            <Route exact path="/signin" component={Auth(LoginPage, false)} />
            <Route exact path="/signup" component={Auth(RegisterPage, false)} />
            <Route exact path="/mypage" component={Auth(MyPage, true)} />
            <Route exact path="/cart" component={Auth(Cart, true)} />
            <Route exact path="/gallery/upload" component={Auth(GalleryUpload, true)} />
            <Route exact path="/gallery/:galleryId" component={Auth(GalleryDetailPage, null)} />
            <Route exact path="/goods/upload" component={Auth(GoodsUpload, true)} />
          </Switch>
        </Wrapper>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  );
}

export default App;
