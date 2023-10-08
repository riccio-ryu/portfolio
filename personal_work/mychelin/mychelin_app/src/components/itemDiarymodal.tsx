import WrapBox from './wrapBox'

interface itemDiaryModal {
  view: boolean
  onModal(): void
}

export default function ItemDiaryModal({ view, onModal }: itemDiaryModal) {
  return (
    <>
      {view && <WrapBox color="bg-transparent" onClose={onModal} />}
      <div
        className={`absolute right-1.5 top-4 z-30 flex min-w-[120px] flex-col items-center justify-between gap-2 rounded bg-white px-6 py-2 text-xs drop-shadow-lg  ${
          view ? 'block' : 'hidden'
        }`}
        //   shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
      >
        <button className="text-mcl-red">삭제</button>
        <button>수정</button>
        <button>좋아요 수 숨기기</button>
        <button>댓글 사용 안함</button>
        <button onClick={onModal}>취소</button>
      </div>
    </>
  )
}
