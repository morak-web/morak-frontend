import { useEffect, useMemo, useState } from 'react';
import { usePayment } from '../../../context/PaymentContext';
import { useProject } from '../../../context/ProjectContext';

const STATUS = {
  PAID: '결제 완료',
  PENDING: '결제 예정',
};

export default function PaymentListPage() {
  const { payment = [], fetchPayment, loading, error } = usePayment();
  const { fetchProjectDetail } = useProject(); // 훅은 최상위에서만!
  const [titleById, setTitleById] = useState({}); // { [projectId]: title }
  const formatYMD = (d) => {
    if (!d) return '-';
    const dt = new Date(d);
    if (Number.isNaN(dt)) return '-';
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${y}.${m}.${dd}`;
  };

  const todayStr = formatYMD(new Date()); // 결제 목록 가져오기
  useEffect(() => {
    fetchPayment?.();
  }, [fetchPayment]);

  // 결제 목록의 projectId들에 대한 프로젝트 제목을 한 번에 로드해서 캐시
  useEffect(() => {
    if (!payment || payment.length === 0) return;
    const ids = [...new Set(payment.map((p) => p?.projectId).filter(Boolean))];

    let cancelled = false;
    (async () => {
      const updates = {};
      for (const pid of ids) {
        try {
          // fetchProjectDetail이 데이터를 반환한다는 가정
          const detail = await fetchProjectDetail(pid);
          const title = detail?.title;
          if (title) updates[pid] = title;
        } catch (e) {
          // 실패해도 무시하고 진행
          // console.error('[fetchProjectDetail]', pid, e);
        }
      }
      if (!cancelled && Object.keys(updates).length) {
        setTitleById((prev) => ({ ...prev, ...updates }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [payment, fetchProjectDetail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>error!! {String(error.message || error)}</div>;

  return (
    <div className="w-[100%] h-[710px] bg-white rounded-[11px] px-[30px] py-[30px] flex flex-col gap-[28px] items-center">
      <div className="self-start">
        <h1 className="text-[18px] font-medium">결제 내역</h1>
      </div>

      <div className=" bg-[#F7F8FC] w-[95%] h-[90%] rounded-[30px] py-[31px] pl:[31px] pr-[28px]">
        <div className="h-[100%] px-[39px] overflow-y-auto custom-scrollbar">
          {/* 헤더 */}
          <div className="text-[#525466] h-[6%] text-[13px] font-semibold flex justify-between border-b-[1px] border-[#5254664f] pb-[13px]">
            <h1 className="w-[36%]">프로젝트 명</h1>
            <h1 className="w-[16%] text-center">결제일</h1>
            <h1 className="w-[16%] text-center">청구 금액</h1>
            <h1 className="w-[16%] text-center">청구일</h1>
            <h1 className="w-[16%] text-center">결제 상태</h1>
          </div>

          {/* 리스트 */}
          <div className="h-[94%] w-[100%]">
            {payment?.map((item) => {
              const title =
                titleById[item.projectId] ?? `프로젝트 #${item.projectId}`;
              const amount = Number(item.amount);
              return (
                <div
                  key={String(
                    item.paymentId ?? `${item.projectId}-${item.createdAt}`
                  )}
                  className="flex justify-between py-[13px] border-b-[1px] border-[#52546631] text-[12px] font-light text-[#525466]"
                >
                  <h1 className="w-[260px]">{title}</h1>
                  <h1 className="w-[100px] text-center">{todayStr}</h1>
                  <h1 className="w-[120px] text-center">
                    {Number.isFinite(amount) ? amount.toLocaleString() : '-'}
                  </h1>
                  <h1 className="w-[16%] text-center">
                    {item.createdAt
                      ? item.createdAt.slice(0, 10).replaceAll('-', '.')
                      : '-'}
                  </h1>
                  <div className="w-[16%] flex justify-center">
                    <button
                      className={`${
                        item.status === 'PAID'
                          ? 'bg-[#DFE1ED] border-[#B0B3C6]'
                          : 'bg-[#FFD4D4] border-[#FF8484]'
                      } w-[80%] rounded-[19px] h-[100%] text-center border-[1px]`}
                    >
                      {STATUS[item.status] ?? item.status}
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
