import React from 'react'

const Breadcrumb = (props) => {
  const breadcrumbClickHandler = (breadcrumb) => {
    props.setSections((prevState) => {
      const indexOfSectionToJump = prevState.indexOf(breadcrumb)
      const newBreadcrumbs = []
      for (let i = 0; i <= indexOfSectionToJump; i++) {
        newBreadcrumbs[i] = prevState[i]
      }
      return newBreadcrumbs
    })
  }

  return (
    <div className='flex flex-wrap justify-start items-center gap-2 font-bold text-lg dark:text-white text-black'>
      {!props.isRootSection &&
        props.sections.map((breadcrumb, index) => {
          const oddBreadcrumb = (index + 1) % 2 !== 0
          return (
            <React.Fragment key={breadcrumb}>
              <button
                type='button'
                className='text-xl hover:underline'
                onClick={() => breadcrumbClickHandler(breadcrumb)}
              >
                {breadcrumb}
              </button>
              {oddBreadcrumb && (
                <div className='rounded-full p-1 bg-slate-400'></div>
              )}
            </React.Fragment>
          )
        })}
    </div>
  )
}
export default Breadcrumb
