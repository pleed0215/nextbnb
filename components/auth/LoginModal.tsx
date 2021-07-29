import React, { useState } from "react";
import styled from "styled-components";
import EyeIcon from "../../public/static/svg/eye.svg";
import CloseEyeIcon from "../../public/static/svg/eye-closed.svg";
import EmailIcon from "../../public/static/svg/email.svg";
import CloseXIcon from "../../public/static/svg/xicon.svg";
import Button from "../common/Button";
import Input from "../common/Input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../store/user";
import { loginAPI } from "../../lib/api/auth";
import { setAuthMode } from "../../store/auth.mode";

const LoginModalBlock = styled.div`
  width: 568px;
  height: 614px;
  background-color: white;
  padding: 32px;
  z-index: 12;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${(props) => props.theme.palette.gray_eb};
  }

  .login-modal-set-sign-up {
    color: ${(props) => props.theme.palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

type LoginModalProps = {
  close: () => void;
};
type FormProp = {
  email: string;
  password: string;
};
const LoginModal: React.FC<LoginModalProps> = ({ close }) => {
  const dispatch = useDispatch();
  const [hideText, setHideText] = useState(true);
  const [error, setError] = useState("");
  const defaultValues: FormProp = {
    email: "",
    password: "",
  };
  const { control, handleSubmit, formState } = useForm<FormProp>({
    defaultValues,
    mode: "onBlur",
  });
  const onValid: SubmitHandler<FormProp> = async (data) => {
    try {
      const { data: user } = await loginAPI(data);
      dispatch(setLoggedUser(user));
      close();
    } catch (e) {
      switch (e.response.status) {
        case 403:
          setError("패스워드가 일치하지 않습니다.");
          break;
        case 404:
          setError("유저가 존재하지 않습니다.");
          break;
        default:
          setError("로그인에 실패하였습니다.");
          break;
      }

      console.log(e);
    }
  };
  const onInvalid: SubmitErrorHandler<FormProp> = (data, event) => {
    console.log(data);
    console.log(event);
  };
  const onClickToggleVisible = () => {
    setHideText((prev) => !prev);
  };
  const onClickSignup = () => {
    dispatch(setAuthMode("signup"));
  };
  return (
    <LoginModalBlock>
      <CloseXIcon className="modal-close-x-icon" onClick={close} />
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="input-wrapper">
          <Input
            control={control}
            placeholder="이메일 주소"
            type="email"
            name="email"
            icon={<EmailIcon />}
            isValid={!Boolean(formState.errors.email)}
            useValidation
            errorMessage={formState.errors.email?.message}
            rules={{
              required: {
                value: true,
                message: "이메일을 입력해주세요.",
              },
            }}
          />
        </div>
        <div className="input-wrapper">
          <Input
            control={control}
            placeholder="비밀번호 설정하기"
            type={hideText ? "password" : "text"}
            name="password"
            icon={
              hideText ? (
                <CloseEyeIcon onClick={onClickToggleVisible} />
              ) : (
                <EyeIcon onClick={onClickToggleVisible} />
              )
            }
            isValid={!Boolean(formState.errors.password)}
            useValidation
            errorMessage={formState.errors.password?.message}
            rules={{
              required: true,
              minLength: 8,
              maxLength: 20,
            }}
          />
        </div>
        <div className="login-modal-submit-button-wrapper">
          <Button type="submit">로그인 하기</Button>
        </div>
      </form>
      <p>
        에어비엔비 계정이 없으신가요?
        <span
          className="login-modal-set-sign-up"
          role="presentation"
          onClick={onClickSignup}
        >
          가입하기
        </span>
      </p>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: 16 }}>
          {error}
        </p>
      )}
    </LoginModalBlock>
  );
};

export default LoginModal;
