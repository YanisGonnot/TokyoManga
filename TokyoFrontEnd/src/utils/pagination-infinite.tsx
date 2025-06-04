//import { useInView } from 'react-intersection-observer';
//import { useQuery, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'


//INFINITE SCROLL
    /*
    const {fetchNextPage,fetchPreviousPage, hasNextPage, hasPreviousPage,
      isFetchingNextPage, isFetchingPreviousPage, promise,...result
    } = useInfiniteQuery({
      queryKey : ["MANGAS Scroll", pageNumber],
      queryFn: () => getMangasAndPagination(pageNumber),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
        lastPage.pagination.last_visible_page,
      getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
        firstPage.pagination.last_visible_page,
    })

    const { ref, inView } = useInView();

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [fetchNextPage, inView]);
    */