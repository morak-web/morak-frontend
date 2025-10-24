import MainLayout from '../../components/layout/MainLayout';
import { useChat } from '../../context/ChatContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import morakAI from '../../assets/morak2.png';
import sendIcon from '../../assets/send-icon.png';

export default function ChatPage() {
  const [chatRoomId, setChatRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const {
    fetchChatList,
    chatList,
    fetchMessageList,
    msgList, // 서버에서 내려오는 메시지 리스트
    sendMessages,
  } = useChat();

  // 화면 표시용(낙관적 메시지 포함)
  const [viewMessages, setViewMessages] = useState([]);

  const scrollRef = useRef(null);

  // ---------- Utils ----------
  const fmtTime = (v) => {
    // 로컬 HH:MM로 표시
    const d = v instanceof Date ? v : new Date(v);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 서버 리스트와 낙관적 리스트 병합
  const mergeMessages = (prev, server) => {
    const merged = [...prev];
    const serverList = (server || []).map((s) => ({
      ...s,
      _optimistic: false,
      // 서버가 ms를 안 주면 ISO 기준 ms 생성
      sentAtMs:
        s.sentAtMs ?? (s.sentAt ? new Date(s.sentAt).getTime() : undefined),
    }));

    serverList.forEach((s) => {
      // 낙관적 메시지를 동일 콘텐츠 & 근접 시간으로 매칭해 서버 메시지로 치환
      const idx = merged.findIndex((m) => {
        const mMs = m.sentAtMs ?? (m.sentAt ? new Date(m.sentAt).getTime() : 0);
        const sMs = s.sentAtMs ?? (s.sentAt ? new Date(s.sentAt).getTime() : 0);
        return (
          m._optimistic &&
          m.content === s.content &&
          Math.abs(mMs - sMs) < 15000
        ); // 15초 윈도우
      });

      if (idx >= 0) {
        merged[idx] = s;
      } else {
        const exists = merged.some((m) => m.id && s.id && m.id === s.id);
        if (!exists) merged.push(s);
      }
    });

    // 중복 제거 & 정렬
    const byKey = new Map();
    merged.forEach((m) => {
      const key = m.id || `${m.content}-${m.sentAt}`;
      byKey.set(key, {
        ...m,
        sentAtMs:
          m.sentAtMs ?? (m.sentAt ? new Date(m.sentAt).getTime() : undefined),
      });
    });

    return Array.from(byKey.values()).sort(
      (a, b) => (a.sentAtMs ?? 0) - (b.sentAtMs ?? 0)
    );
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // ---------- Effects ----------
  // 채팅 목록 로드
  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  // 방 변경 시 서버에서 메시지 로드
  useEffect(() => {
    if (!chatRoomId) return;
    (async () => {
      await fetchMessageList(chatRoomId);
    })();
    // 방 전환 시 뷰 초기화 (서버 응답 오면 병합됨)
    setViewMessages([]);
  }, [chatRoomId, fetchMessageList]);

  // 서버 리스트가 바뀌면 병합 반영
  useEffect(() => {
    setViewMessages((prev) => mergeMessages(prev, msgList || []));
  }, [msgList]);

  // 메시지/전송/방 변경 시 스크롤 맨 아래
  useEffect(() => {
    scrollToBottom();
  }, [viewMessages, isSending, chatRoomId]);

  const showChat = useMemo(
    () =>
      chatList?.find((item) => String(item.chatRoomId) === String(chatRoomId)),
    [chatList, chatRoomId]
  );

  // ---------- Handlers ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!chatRoomId) return;
    const content = message.trim();
    if (!content || isSending) return;

    setIsSending(true);

    // ✅ 지금 보낸 메시지의 시간은 로컬 new Date 기준
    const now = new Date();
    const optimisticMsg = {
      id: `tmp-${now.getTime()}`,
      content,
      senderRole: 'CLIENT', // 본인 역할에 맞게 조정
      sentAt: now.toISOString(), // ISO도 함께 저장
      sentAtMs: now.getTime(), // 병합/정렬에 사용
      profileImageUrl: '',
      _optimistic: true,
    };

    // 보낸 즉시 화면에 추가
    setViewMessages((prev) => [...prev, optimisticMsg]);
    setMessage('');
    scrollToBottom();

    try {
      await sendMessages(chatRoomId, content);
      await fetchMessageList(chatRoomId); // 서버 리스트로 병합(위 useEffect)
    } catch (err) {
      console.error(err);
      // 실패 시 낙관적 메시지 제거
      setViewMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-[#F2F3FA] flex justify-center items-center">
        <div className="w-[1209px] h-[770px] bg-white py-[39px] px-[50px] rounded-[10px] shadow-lg flex">
          {/* 좌측: 채팅 목록 */}
          <div className="w-[300px] mr-[21px]">
            <h1 className="mb-[37px] text-[20px] font-bold text-[#525466]">
              채팅 목록
            </h1>
            <div className="overflow-y-auto h-[650px] flex flex-col gap-[30px]">
              {chatList?.map((item) => (
                <button
                  type="button"
                  onClick={() => setChatRoomId(item.chatRoomId)}
                  key={item.chatRoomId}
                  className="w-[290px] h-[70px] flex items-center cursor-pointer"
                >
                  <img
                    src={item.profileImageUrl}
                    className="w-[54px] h-[54px] rounded-[50%] bg-red-200 mr-[17px]"
                  />
                  <div className="flex flex-col mr-[5px] w-[220px]">
                    <div className="flex justify-between">
                      <h1 className="text-[15px] text-[#525466] font-medium">
                        {item?.partnerName}
                      </h1>
                      <p className="text-[11px] font-light text-[#525466]">
                        {item?.updatedAt?.slice(0, 10).replaceAll('-', '.')}
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="flex text-[13px] w-[190px] font-light text-[#525466]">
                        {(item?.lastMessage?.content || '').slice(0, 17)}...
                      </p>
                      <h1
                        className={`${item?.unreadCount && 'w-[15px] mt-[2px] h-[15px] rounded-[50%] bg-red-400 text-white flex justify-center items-center text-[10px]'}`}
                      >
                        {item?.unreadCount}
                      </h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#5254664d] w-[1px] h-full" />

          {/* 우측: 채팅창 */}
          {chatRoomId === '' ? (
            <div className="w-full pb-[200px] flex flex-col gap-[20px] justify-center items-center">
              <img
                src={morakAI}
                alt=""
                className="w-[130px] h-[130px] rounded-[50%]"
              />
              <h1 className="text-[#525466] text-[20px]">
                새로운 채팅을 시작하세요!
              </h1>
            </div>
          ) : (
            <div className="px-[21px] w-[780px]">
              {/* 상단 헤더 */}
              <div className="h-[107px] px-[12px] py-[20px] border-b-[1px] border-[#5254664d] flex gap-[27px]">
                <img
                  src={showChat?.profileImageUrl}
                  alt="profileImageUrl"
                  className="w-[71px] h-[71px] rounded-[50%] bg-blue-200"
                />
                <div>
                  <h1 className="text-[#525466] text-[20px]">
                    {showChat?.partnerName}
                  </h1>
                  <p className="font-light text-[#525466] text-[15px]">
                    {showChat?.projectTitle}
                  </p>
                </div>
              </div>

              {/* 메시지 + 입력 */}
              <div className="h-[570px] flex flex-col justify-end gap-[24px]">
                {/* 메시지 영역 */}
                <div
                  ref={scrollRef}
                  className="flex flex-col h-[475px] gap-[29px] overflow-y-auto custom-scrollbar px-[15px]"
                >
                  {viewMessages?.map((item, idx) => (
                    <div key={item.id || `${item.sentAt}-${idx}`}>
                      {item.senderRole === 'CLIENT' ? (
                        // 내가 보낸 메시지 (오른쪽)
                        <div className="flex items-end justify-end gap-[5px]">
                          <h1 className="text-[11px] mb-[5px] text-[#525466] font-light">
                            {fmtTime(item.sentAtMs ?? item.sentAt)}
                          </h1>
                          <div
                            className={`px-[26px] py-[18px] rounded-[26px] 
                            bg-[#E6EFFF]`}
                          >
                            <h1 className="text-[14px] text-[#525466]">
                              {item.content}
                            </h1>
                          </div>
                        </div>
                      ) : (
                        // 상대방 메시지 (왼쪽)
                        <div className="flex items-end justify-start ">
                          <img
                            src={item.profileImageUrl}
                            alt="profileImageUrl"
                            className="w-[42px] h-[42px] bg-blue-200 rounded-[50%]"
                          />
                          <div className="px-[26px] py-[18px] rounded-[26px] bg-[#F7F8FC] mr-[5px] ml-[13px]">
                            <h1 className="text-[14px] text-[#525466]">
                              {item.content}
                            </h1>
                          </div>
                          <h1 className="text-[11px] mb-[5px] text-[#525466] font-light">
                            {fmtTime(item.sentAtMs ?? item.sentAt)}
                          </h1>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 입력창 */}
                <form
                  onSubmit={onSubmit}
                  className="self-center ml-[36px] w-[700px] h-[51px] bg-[#EBEEFA] rounded-[35px] flex items-center justify-between px-[15px]"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={!chatRoomId || isSending}
                    placeholder={
                      chatRoomId
                        ? '메시지를 입력하세요'
                        : '좌측에서 채팅을 선택하세요'
                    }
                    className="h-[40px] w-[600px] text-[#525466] border-none outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer"
                    disabled={!message.trim() || isSending}
                  >
                    <img
                      src={sendIcon}
                      alt="sendIcon"
                      className="w-[24px] h-[24px]"
                    />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
