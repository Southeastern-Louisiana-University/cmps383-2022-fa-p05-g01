
using FA22.P05.Web.Data;
using FA22.P05.Web.Extensions;
using FA22.P05.Web.Features.Bids;
using FA22.P05.Web.Features.Listings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Controllers
{
    [Route("api/bids")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly DbSet<Bid> _bids;
        private readonly DataContext _dataContext;
        private readonly DbSet<Listing> _listings;

        public BidsController(DataContext dataContext)
        {
            _dataContext = dataContext;
            _bids = dataContext.Set<Bid>();
            _listings = dataContext.Set<Listing>();
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public ActionResult<BidDto> GetBidById(int id)
        {
            var result = _bids.FirstOrDefault(x => x.Id == id);
            if(result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public  ActionResult<BidDto> CreateBid(BidDto bidDto)
        {
            if (IsInvalid(bidDto)){
                    return BadRequest();
                 }
            var listing = _listings.FirstOrDefault(x => x.Id == bidDto.ListingId);

            if(listing == null) {
                return BadRequest();
            }
            var bid = new Bid {
                BidAmount = bidDto.BidAmount,
                ListingId = listing.Id,
                UserId = User.GetCurrentUserId() ?? throw new Exception("missing user id")
            };
            _bids.Add(bid);
           _dataContext.SaveChanges();
            bidDto.Id = bid.Id;

            return CreatedAtAction(nameof(GetBidById), new { id = bidDto.Id }, bidDto);
        }
       
        private static bool IsInvalid(BidDto dto)
        {
            return ((dto.BidAmount <= 0) || (dto.UserId <= 0 ) || (dto.ListingId <= 0));
        }
        public static IQueryable<BidDto> GetBidDtos(IQueryable<Bid> bids)
        {
            return bids
                .Select(x => new BidDto
                {
                    Id = x.Id,
                    BidAmount = x.BidAmount,
                    UserId = x.UserId,
                    ListingId = x.Listing!.Id,
                });
        }
    }
}
