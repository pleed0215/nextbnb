import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import EmailIcon from "../../public/static/svg/email.svg";
import PersonIcon from "../../public/static/svg/person.svg";
import EyeIcon from "../../public/static/svg/eye.svg";
import CloseEyeIcon from "../../public/static/svg/eye-closed.svg";
import CloseXIcon from "../../public/static/svg/xicon.svg";
import Input from "../common/Input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../store/user";
import { setAuthMode } from "../../store/auth.mode";

const SignUpModalBlock = styled.div`
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

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.33333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${(props) => props.theme.palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${(props) => props.theme.palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const SignUpModal: React.FC<{ close: () => void }> = ({ close }) => {
  type InputState = {
    email: string;
    lastname: string;
    firstname: string;
    password: string;
    month: string;
    day: string;
    year: string;
  };
  const defaultValues: InputState = {
    email: "",
    lastname: "",
    firstname: "",
    password: "",
    month: "월",
    day: "일",
    year: "년",
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState,
    control,
    trigger,
    setError,
  } = useForm<InputState>({
    defaultValues,
    mode: "onBlur",
  });
  const [hideText, setHideText] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    register("day", {
      validate: {
        mustHaveValue: (v) => v !== "일",
      },
    });
    register("month", {
      validate: {
        mustHaveValue: (v) => v !== "월",
      },
    });
    register("year", {
      validate: {
        mustHaveValue: (v) => v !== "년",
      },
    });
  }, [register]);

  const onClickLogin = () => {
    dispatch(setAuthMode("login"));
  };

  const onValid: SubmitHandler<InputState> = async (data) => {
    try {
      const { day, month, year, ...rest } = data;
      const birthday = new Date(+year, +month, +day).toISOString();
      const signupBody = {
        ...rest,
        birthday,
      };
      const { data: user } = await signupAPI(signupBody);
      dispatch(setLoggedUser(user));
      close();
    } catch (e) {
      console.log(e);
    }
  };
  const onInvalid: SubmitErrorHandler<InputState> = (data, event) => {
    console.log(data);
    console.log(event);
  };
  const onClickToggleVisible = () => {
    setHideText((prev) => !prev);
  };

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    const inputName = name as keyof InputState;
    setValue(inputName, value);
  };

  const onBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement> =
    async ({ target: { name, value } }) => {
      const inputName = name as keyof InputState;
      const result = await trigger(inputName);
      if (!result) {
        setError(inputName, { type: "validate" });
      }
    };

  return (
    <SignUpModalBlock>
      <CloseXIcon className="modal-close-x-icon" onClick={close} />
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="input-wrapper">
          <Input
            control={control}
            placeholder="이메일 주소"
            type="email"
            name="email"
            icon={<EmailIcon />}
            onChange={onChange}
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
            placeholder="이름(예: 길동)"
            type="text"
            name="firstname"
            icon={<PersonIcon />}
            onChange={onChange}
            isValid={!Boolean(formState.errors.firstname)}
            useValidation
            errorMessage={formState.errors.firstname?.message}
            rules={{
              required: true,
              maxLength: {
                value: 20,
                message: "너무 긴 이름입니다(20글자 이하)",
              },
            }}
          />
        </div>
        <div className="input-wrapper">
          <Input
            control={control}
            placeholder="성(예: 홍)"
            type="text"
            name="lastname"
            icon={<PersonIcon />}
            onChange={onChange}
            isValid={!Boolean(formState.errors.lastname)}
            useValidation
            errorMessage={formState.errors.lastname?.message}
            rules={{
              required: false,
              maxLength: {
                value: 20,
                message: "너무 긴 이름입니다(20글자 이하)",
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
            onChange={onChange}
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
        <p className="sign-up-birthday-label">생일</p>
        <p className="sign-up-modal-birthday-info">
          만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
          에어비엔비 이용자에게 공개되지 않습니다.
        </p>
        <div className="sign-up-modal-birthday-selectors">
          <div className="sign-up-modal-birthday-month-selector">
            <Selector
              options={monthList}
              disabledOptions={["월"]}
              defaultValue="월"
              name="month"
              onChange={onChange}
              onBlur={onBlur}
              isValid={!Boolean(formState.errors.month)}
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector
              options={dayList}
              disabledOptions={["일"]}
              defaultValue="일"
              name="day"
              onChange={onChange}
              onBlur={onBlur}
              isValid={!Boolean(formState.errors.day)}
            />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector
              options={yearList}
              disabledOptions={["년"]}
              defaultValue="년"
              name="year"
              onChange={onChange}
              onBlur={onBlur}
              isValid={!!!Boolean(formState.errors.year)}
            />
          </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
          <Button type="submit">가입하기</Button>
        </div>
      </form>
      <p>
        이미 에어비엔비 계정이 있으신가요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={onClickLogin}
        >
          로그인
        </span>
      </p>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
