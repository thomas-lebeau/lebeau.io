'use strict';

angular.module('portfolioApp')
  .service('Projects', function Projects() {
  var projects = [
    {
      name: 'Emka Yapi',
      slug: 'emkayapi',
      categories: ['design', 'development', 'wordpress'],
      detail: '',
      date: '2013-09-12',
      url: 'http://emkayapi.com.com'
    },
    {
      name: 'Usta Evinizde',
      slug: 'ustaevinizde',
      categories: ['design', 'development'],
      detail: 'A home service company who needed a slick website to promote their service',
      date: '2011-12-20',
      url: 'http://ustaevinizde.com'
    },
    {
      name: 'Carnaist Travel',
      slug: 'carnaist',
      categories: ['design', 'development'],
      url: 'http://carnaist.com'
    },
    {
      name: 'Farklı İnşaat',
      slug: 'farkliinsaat',
      categories: ['design', 'development', 'admin panel'],
      url: 'http://farkliinsaat.com'
    },
    {
      name: 'Hatice Atik',
      slug: 'haticeatik',
      categories: ['design', 'development', 'logo'],
      url: 'http://haticeatik.com'
    },
    {
      name: 'Ergi Yapı',
      slug: 'ergiyapi',
      categories: ['design', 'development'],
      url: 'http://ergiyapi.com'
    },
    {
      name: 'Newage Clinic',
      slug: 'newageclinic',
      categories: ['wordpress integration'],
      url: 'http://newage-clinic.com'
    },
    {
      name: 'Tiyatrol',
      slug: 'tiyatrol',
      categories: ['wordpress integration'],
      url: 'http://tiyatrol.net'
    },
    {
      name: 'Mete Aksu Clinic',
      slug: 'meteaksu',
      categories: ['wordpress integration'],
      url: 'http://meteaksu.com'
    },
    {
      name: 'RDS Reklam',
      slug: 'rds',
      categories: ['development'],
      url: 'http://rdsreklam.com.tr'
    },
    {
      name: 'Meriç Aile Pansiyon',
      slug: 'eceabatpansiyon',
      categories: ['wordpress integration'],
      url: 'http://eceabatpansiyon.net'
    },
    {
      name: 'Renee Clinic',
      slug: 'renee',
      categories: ['wordpress integration'],
      url: 'http://reneeklinik.com'
    },
    {
      name: 'Günder Tekstil',
      slug: 'gundertekstil',
      categories: ['design', 'development', 'admin panel'],
      url: 'http://gundertekstil.com.tr'
    },
    {
      name: 'Chameleon Reklam',
      slug: 'chameleon',
      categories: ['development'],
      url: 'http://chameleonreklam.com'
    },
    {
      name: 'Atasan',
      slug: 'atasan',
      categories: ['design'],
      url: 'http://atasan.com'
    },
    {
      name: 'Arena',
      slug: 'arena',
      categories: ['design', 'development']
    },
    {
      name: 'Aleni Reklam',
      slug: 'alenireklam',
      categories: ['development'],
      url: 'http://alenireklam.com'
    },
    {
      name: 'Code Bounty',
      slug: 'codebounty',
      categories: ['development'],
      url: 'http://codebounty.co'
    }
  ];


  this.getProjects = function () {
    return projects;
  };

});
