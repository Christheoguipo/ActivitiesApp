namespace Application.Core
{
    public class PagingParams
    {
        public int PageNumber { get; set; } = 1;

        private const int MAX_PAGE_SIZE = 50;
        private int _pagesize = 2;

        public int PageSize
        {
            get => _pagesize;
            set => _pagesize = value > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : value;
        }

    }
}
