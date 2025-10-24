import MainLayout from '../../../components/layout/MainLayout';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useProject } from '../../../context/ProjectContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RequestWritePage() {
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  // api
  const { create, responseData } = useProject();
  const [title, setTitle] = useState('');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [userRequirements, setUserRequirements] = useState('');
  const [designerRequirements, setDesignerRequirements] = useState('');
  const startDate = new Date();
  function toDateString(d) {
    if (!d) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const categoryId = responseData?.categoryId;

    const payload = {
      categoryId: Number(categoryId),
      title: title.trim(),
      budgetEstimate: Number(budgetEstimate),
      dueDate: toDateString(dueDate),
      userRequirements: userRequirements.trim(),
      designerRequirements: designerRequirements.trim(),
    };
    try {
      const created = await create(payload);
      const { projectId } = created;
      console.log(projectId);
      navigate(`/request/AI-question/${projectId}`);
    } catch (e) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    if (
      !title ||
      !budgetEstimate ||
      !dueDate ||
      !userRequirements ||
      !designerRequirements
    ) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [title, budgetEstimate, dueDate, userRequirements, designerRequirements]);

  return (
    <MainLayout>
      <form
        onSubmit={onSubmit}
        className="w-[100%] bg-[#f1f2f8] min-h-[calc(100vh-64px)] py-[30px] flex items-center"
      >
        <div className=" w-[100%] sm:w-[55%] mx-auto bg-white h-[729px] rounded-[16px] shadow-[6px_0px_5px_rgba(0,0,0,0.1),0_7px_6px_rgba(0,0,0,0.1)] px-[42px] py-[29px] flex flex-col justify-between">
          <h1 className="text-[24px] font-bold flex flex-col mb-[30px]">
            의뢰서 직접 작성
          </h1>
          <div className="overflow-y-auto flex flex-col gap-[27px] pr-[31px] custom-scrollbar mb-10">
            <div>
              <h1 className="text-[#525466] text-[17px] mb-2">
                <span className="text-red-600">*</span> 프로젝트 제목
              </h1>
              <input
                type="text"
                className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[100%] text-black font-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] px-4 text-[15px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="relative">
              <h1 className="text-[#525466] text-[17px] mb-2">
                <span className="text-red-600">*</span> 지출 가능 예산
              </h1>
              <input
                type="text"
                className="w-[200px] bg-[#F7F8FC] rounded-[8px] h-[40px] text-black font-[16px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694] 
                pl-8 text-[15px]"
                value={budgetEstimate}
                onChange={(e) => setBudgetEstimate(e.target.value)}
              />
              <p className="text-[#B0B3C6] text-[14px] absolute bottom-2 left-[10px]">
                ₩
              </p>
            </div>
            <div className="flex items-end">
              <div>
                <h1 className="text-[#525466] text-[17px] mb-2">
                  <span className="text-red-600">*</span> 예상 시작일
                </h1>
                <DatePicker
                  shouldCloseOnSelect
                  selected={startDate}
                  onChange={(data) => setStartDate(data)}
                  startDate={startDate}
                  endDate={dueDate}
                  dateFormat="yyyy. MM. dd"
                  className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[121px] text-[14px] text-center outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
              </div>
              <p className="text-[#B0B3C6] text-[30px] mx-[25px]">-</p>
              <div>
                <h1 className="text-[#525466] text-[17px] mb-2">마감일</h1>
                <DatePicker
                  selected={dueDate}
                  onChange={(data) => setDueDate(data)}
                  startDate={startDate}
                  endDate={dueDate}
                  placeholderText="YYYY. MM. DD"
                  dateFormat="yyyy. MM. dd"
                  className="bg-[#F7F8FC] rounded-[8px] h-[40px] w-[121px] text-[14px] text-center outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                  popperPlacement="bottom-start"
                  popperClassName="z-[9999]"
                />
              </div>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 상세 요구 사항
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                프로젝트 개요 / 주요 기능(화면 구성, 필수 페이지 등) / 톤앤매너
                / 우대사항 등을 알려주세요.
              </p>
              <textarea
                className="w-[100%] h-[125px] bg-[#F7F8FC] rounded-[20px] resize-none py-[10px] px-4 text-black text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                value={userRequirements}
                onChange={(e) => setUserRequirements(e.target.value)}
              ></textarea>
            </div>
            <div>
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 모집 요건
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                원하는 디자이너의 필수 역량, 사용 툴 등을 적어주세요.
              </p>
              <textarea
                className="w-[100%] h-[125px] bg-[#F7F8FC] rounded-[20px] resize-none py-[10px] px-4 text-black text-[15px] border-[1px] border-transparent outline-none focus:border-[1px] focus:border-[#d6d6d694]"
                value={designerRequirements}
                onChange={(e) => setDesignerRequirements(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-[140px]">
              <h1 className="text-[#525466] text-[17px]">
                <span className="text-red-600">*</span> 참고 자료
              </h1>
              <p className="text-[#525466] text-[12px] mb-[6px]">
                레퍼런스나 필요한 자료를 추가해주세요.
              </p>
              <button className="bg-[#F7F8FC] w-[100%] h-[40px] border-[1px] border-[#B0B3C6] rounded-[8px] cursor-pointer text-[#B0B3C6] text-[24px] text-center">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/request/category')}
              className="text-[18px] cursor-pointer"
            >
              이전
            </button>
            <button
              type="submit"
              onClick={() => navigate('/request/AI-question')}
              className={`${warning ? 'bg-gray-300 pointer-events-none' : 'bg-[#BDCFFF]'} px-[17px] py-[8px] rounded-[16px] text-[18px] cursor-pointer`}
            >
              다음
            </button>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}
