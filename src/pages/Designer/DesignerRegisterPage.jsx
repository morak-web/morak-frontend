import { useState } from 'react';
import DesignerPortfolioModal from './Porfolio/DesignerPortfolioModal';
import { useDesigner } from '../../context/DesignerContext';
import { useMyInfo } from '../../context/MyInfoContext';
import { useEffect } from 'react';

export default function DesignerRegisterPage() {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const { fetchMyInfo, myInfo } = useMyInfo();
  useEffect(() => {
    fetchMyInfo();
  }, []);
  // 디자이너 등록 api
  const { desginerRegisterInfo, createDesignerRegister } = useDesigner();
  const [interestedIn, setInterestedIn] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [intro, setIntro] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: myInfo?.name,
      interestedIn: interestedIn.trim(),
      yearsOfExperience: Number(yearsOfExperience),
      intro: intro.trim(),
    };
    console.log(payload);
    try {
      const created = await createDesignerRegister(payload);
      console.log(desginerRegisterInfo);
      alert('디자이너 정보');
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-white w-[95%] min-h-[577px] rounded-[11px] px-[36px] py-[26px] flex flex-col justify-between"
      >
        <section className="mb-[40px]">
          <h1 className="text-[20px] text-[#525466] font-semibold">
            디자이너 등록
          </h1>
        </section>
        <div className="w-[100%] h-[400px] px-[5px] sm:px-[20px] flex flex-col justify-between mb-[10px]">
          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold  w-[30%] sm:w-[25%]">
              이름
            </h1>
            <input
              type="text"
              disabled={true}
              value={myInfo?.name ?? ''}
              className="flex items-center w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-[#383946] text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              관심 분야
            </h1>
            <input
              type="text"
              value={interestedIn}
              onChange={(e) => setInterestedIn(e.target.value)}
              className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] px-[20px] text-black text-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
            />
          </div>
          <div className="flex items-center">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              디자인 경력
            </h1>
            <div className="w-[70%] md:w-[300px] h-[38px] bg-[#f2f3fa] rounded-[19px] flex items-center pr-[7px] sm:pr-0 sm:gap-5 pl-[20px] focus-within:border-[1px] focus-within:border-[#d6d6d694]">
              <input
                type="number"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className=" w-[80%] outline-none"
              />
              <p className="text-[#525466] text-[13px] whitespace-nowrap ">
                년차
              </p>
            </div>
          </div>
          <div className="flex">
            <h1 className="text-[13px] md:text-[15px] text-[#525466] font-semibold w-[30%] sm:w-[25%]">
              기타 설명
            </h1>
            <div className="flex flex-col gap-[14px] w-[70%] ">
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="h-[180px] bg-[#F2F3FA] rounded-[19px]  resize-none py-[16px] px-[20px] text-black text-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
              />
              <button
                type="button"
                className="w-[100%] md:w-[300px] h-[38px] rounded-[19px] shadow-md  text-[10px] sm:text-[15px] cursor-pointer text-[#525466]"
                onClick={() => setPortfolioModalOpen(true)}
              >
                포트폴리오 등록하기
              </button>
            </div>
          </div>
        </div>
        <section className="w-[100%] flex justify-end">
          <button
            type="submit"
            className="cursor-pointer w-[190px] h-[45px] bg-[#bdcfff] text-[16px] rounded-[23px]"
          >
            등록/수정 완료
          </button>
        </section>{' '}
      </form>
      <DesignerPortfolioModal
        portfolioModalOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
      />
    </>
  );
}
