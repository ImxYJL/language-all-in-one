import VocaItem from './VocaItem';

const VocaList = () => {
  return (
    <ul className="m-4 flex flex-col gap-3 p-2">
      <VocaItem
        id="asdf"
        voca="implement"
        meaning="구현하다, 실행하다"
        example="We need to implement this feature by next week."
        isFavorite={true}
      />
      <VocaItem
        id="ss"
        voca="Could you please elaborate on that?"
        meaning="그것에 대해 좀 더 자세히 설명해 주시겠어요?"
        isFavorite={false}
      />
    </ul>
  );
};

export default VocaList;
