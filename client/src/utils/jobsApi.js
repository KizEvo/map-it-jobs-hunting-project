const jobsApi = (queries, isPagination) => {
  let page = 1
  if (isPagination) page = queries.page

  const queriesString = `/api/v1/jobs?location=${queries.location}&datePosted=${queries.datePosted}&companyBusiness=${queries.companyBusiness}&page=${page}&title=${queries.title}`
  return queriesString
}

export { jobsApi }
