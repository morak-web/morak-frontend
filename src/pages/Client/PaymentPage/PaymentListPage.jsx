import { usePayment } from '../../../context/PaymentContext';
import { useProject } from '../../../context/ProjectContext';
import { useEffect } from 'react';

const STATUS = {
  PAID: '결제 완료',
};
export default function PaymentListPage() {
  const { payment, fetchPayment, loading, error } = usePayment();
  useEffect(() => {
    fetchPayment();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;
  console.log(payment);

  return (
    <div className="w-[100%] h-[710px] bg-white rounded-[11px] px-[30px] py-[30px] flex flex-col gap-[28px] items-center">
      <div className="self-start">
        <h1 className="text-[18px] font-medium">결제 내역</h1>
      </div>
      <div className=" bg-[#F7F8FC] w-[90%] h-[90%] rounded-[30px] py-[31px] pl-[31px] pr-[28px]">
        <div className="h-[100%] pr-[39px] overflow-y-auto custom-scrollbar">
          {/* 위 바 */}
          <div className="text-[#525466] h-[6%] text-[13px] font-semibold flex justify-between border-b-[1px] border-[#5254664f] pb-[13px]">
            <h1 className="w-[36%] ">프로젝트 명</h1>
            <h1 className="w-[16%] text-center">결제일</h1>
            <h1 className="w-[16%] text-center">청구 금액</h1>
            <h1 className="w-[16%] text-center">청구일</h1>
            <h1 className="w-[16%] text-center">결제 상태</h1>
          </div>

          {/* 작업 */}
          <div className="h-[94%] w-[100%]">
            {payment?.map((item) => {
              const { projectDetail, fetchProjectDetail } = useProject();
              fetchProjectDetail(item?.projectId);
              return (
                <div className="flex justify-between py-[13px] border-b-[1px] border-[#52546631] text-[12px] font-light text-[#525466]">
                  <h1 className="w-[36%] ">{projectDetail?.title}</h1>
                  <h1 className="w-[16%] text-center">api</h1>
                  <h1 className="w-[16%] text-center">
                    {item.amount.toLocaleString()}
                  </h1>
                  <h1 className="w-[16%] text-center">
                    {item.createdAt.slice(0, 10).replaceAll('-', '.')}
                  </h1>
                  <div className="w-[16%] flex justify-center">
                    <button
                      className={`${item.status === 'PAID' ? 'bg-[#DFE1ED] border-[#B0B3C6]' : 'bg-[#FFD4D4] border-[#FF8484] '} w-[80%] rounded-[19px] h-[100%] text-center border-[1px] `}
                    >
                      {STATUS[item.status]}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
