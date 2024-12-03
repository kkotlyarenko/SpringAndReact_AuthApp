import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { motion } from 'framer-motion';
import { AccountContext } from './accountContext.ts';

const BoxContainer = styled.div`
  width: 400px;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90%;
    min-height: 600px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 2.5em;
  padding-bottom: 6em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 150%;
  height: 700px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -350px;
  left: -100px;
  transform: rotate(60deg);
  background: linear-gradient(
      58deg, rgba(243,172,18,1) 20%, rgba(241,196,15,1) 100%
  );

  @media (max-width: 768px) {
    width: 170%;
    height: 600px;
  }
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.div`
    font-size: 35px;
    font-weight: 700;
    line-height: 1.5;
    color: #fff;
    z-index: 10;
    text-align: center;
`;

const SmallText = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    margin-top: 10px;
    z-index: 10;
    text-align: center;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    margin-top: 20px;
`;

const backdropVariants = {
    expanded: {
        width: "250%",
        height: "1200px",
        borderRadius: "20%",
        transform: "rotate(60deg)",
    },
    collapsed: {
        width: "140%",
        height: "700px",
        borderRadius: "50%",
        transform: "rotate(60deg)",
    },
};

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export default function AccountBox() {
  const [isExpanded, setExpanded] = useState(true);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1650);
  };

  useEffect(() => {
    setTimeout(() => {
      setExpanded(false);
    }, 0);
  }, []);

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
      <AccountContext.Provider value={contextValue}>
        <BoxContainer>
          <TopContainer>
            <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariants}
                transition={expandingTransition}
            />
            {active === "signin" && (
                <HeaderContainer>
                  <HeaderText>Welcome</HeaderText>
                  <HeaderText>Back</HeaderText>
                  <SmallText>Please sign-in to continue!</SmallText>
                </HeaderContainer>
            )}
            {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>Create</HeaderText>
                  <HeaderText>Account</HeaderText>
                  <SmallText>Please sign-up to continue!</SmallText>
                </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
          </InnerContainer>
        </BoxContainer>
      </AccountContext.Provider>
  );
}