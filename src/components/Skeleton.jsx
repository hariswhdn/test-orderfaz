function SkeletonDetail1() {
  return (
    <div className="skeleton">
      <div>
        <p></p>
        <div></div>
      </div>
      <ul className="scrollbar_hide">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}

function SkeletonDetail2() {
  return (
    <div className="skeleton">
      <ul>
        <li>
          <p></p>
        </li>
        <li>
          <p></p>
        </li>
        <li>
          <p></p>
        </li>
      </ul>
    </div>
  )
}

export { SkeletonDetail1, SkeletonDetail2 }
