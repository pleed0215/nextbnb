import React, { ChangeEventHandler, useEffect, useState } from "react";
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

const SignUpModalBlock = styled.div`
  width: 568px;
  height: 614px;
  background-color: white;
  padding: 32px;
  z-index: 11;

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
  const { register, handleSubmit, setValue } = useForm<InputState>({
    defaultValues,
    mode: "onBlur",
  });
  const [hideText, setHideText] = useState(true);

  const onValid: SubmitHandler<InputState> = (data) => {
    console.log(data);
  };
  const onInvalid: SubmitErrorHandler<InputState> = (data, event) => {
    console.log(data);
    console.log(event);
  };
  const onClickToggleVisible = () => {
    setHideText((prev) => !prev);
  };

  useEffect(() => {
    register("email", {
      required: true,
    });
    register("firstname", {
      required: true,
    });
    register("lastname", { required: false });
    register("password", {
      required: true,
      minLength: 8,
      maxLength: 20,
    });
    register("month");
    register("year");
    register("day");
  });

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({
    target: { name, value },
  }) => {
    const inputName = name as keyof InputState;
    setValue(inputName, value);
  };

  return (
    <SignUpModalBlock>
      <CloseXIcon className="modal-close-x-icon" onClick={close} />
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="input-wrapper">
          <Input
            placeholder="이메일 주소"
            type="email"
            name="email"
            icon={<EmailIcon />}
            onChange={onChange}
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="이름(예: 길동)"
            type="text"
            name="firstname"
            icon={<PersonIcon />}
            onChange={onChange}
          />
        </div>
        <div className="input-wrapper">
          <Input
            placeholder="성(예: 홍)"
            type="text"
            name="lastname"
            icon={<PersonIcon />}
            onChange={onChange}
          />
        </div>
        <div className="input-wrapper">
          <Input
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
            />
          </div>
          <div className="sign-up-modal-birthday-day-selector">
            <Selector
              options={dayList}
              disabledOptions={["일"]}
              defaultValue="일"
              name="day"
              onChange={onChange}
            />
          </div>
          <div className="sign-up-modal-birthday-year-selector">
            <Selector
              options={yearList}
              disabledOptions={["년"]}
              defaultValue="년"
              name="year"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="sign-up-modal-submit-button-wrapper">
          <Button type="submit">가입하기</Button>
        </div>
      </form>
    </SignUpModalBlock>
  );
};

export default SignUpModal;
