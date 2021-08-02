import React, { ChangeEventHandler, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../lib/staticData";
import { useSelector } from "../../store";
import { setPublicBedTypeCount } from "../../store/register.room";
import { BedType } from "../../types/room";
import Button from "../common/Button";
import Counter from "../common/Counter";
import Selector from "../common/Selector";

const RegisterRoomPublicBedTypesBlock = styled.div`
  width: 100%;
  padding: 28px 0;

  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.palette.gray_dd};
  }

  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-bed-type-bedroomd-texts {
    margin-bottom: 28px;
  }

  .register-room-bed-type-bedrom {
    font-size: 19px;
    color: ${(props) => props.theme.palette.gray_48};
  }

  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${(props) => props.theme.palette.gray_76};
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const publicBedList = useSelector(
    (state) => state.registerRoom.publicBedList
  );
  const initialBedOptions = () => publicBedList.map((bed) => bed.type);
  const [activedBedOptions, setActiveBedOptions] =
    useState<BedType[]>(initialBedOptions);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
  }, [activedBedOptions]);

  const totalBedsCount = useMemo(() => {
    let total = 0;
    publicBedList.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedList]);

  const bedTexts = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type} ${bed.count} 개`);
    return texts.join(",");
  }, [publicBedList]);

  const onChangeBedType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setActiveBedOptions([...activedBedOptions, e.target.value as BedType]);
  };

  const onChangeBedTypeCount = (type: BedType) => (value: number) =>
    dispatch(setPublicBedTypeCount({ type, count: value }));
  const onToggleButton = () => setOpened((prev) => !prev);

  return (
    <RegisterRoomPublicBedTypesBlock>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">공용 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개
          </p>
          <p className="register-room-bed-type-bedroom-counts">{bedTexts}</p>
        </div>
        <Button styleType="register" color="gray_f7" onClick={onToggleButton}>
          {opened && "완료"}
          {!opened &&
            (totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-counters">
          {activedBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                onChange={onChangeBedTypeCount(type)}
              />
            </div>
          ))}
        </div>
      )}
      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            type="register"
            defaultValue="다른 침대 추가"
            value="다른 침대 추가"
            disabledOptions={["다른 침대 추가"]}
            options={lastBedOptions}
            useValidation={false}
            onChange={onChangeBedType}
          />
        </div>
      )}
    </RegisterRoomPublicBedTypesBlock>
  );
};

export default RegisterRoomPublicBedTypes;
