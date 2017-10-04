const should = require('should');


describe('{}.noto()', () => {

  it('Write property values', done => {
    roman.noto('address.country:Italy');
    should(roman.address.country).eql('Italy');

    roman.noto(['address.country:Italia']);
    should(roman.address.country).eql('Italia');

    done();
  });

  it('Write new property and values', done => {

    should(roman.lego('address.villa.apartment')).eql(undefined);

    // From string
    roman.noto('address.villa.apartment:Top level');
    should(roman.address.villa.apartment).eql('Top level');

    // From array
    roman.noto(['address.villa.apartment:Bottom level']);
    should(roman.address.villa.apartment).eql('Bottom level');

    done();
  });

  it('Write nested property and values', done => {

    should(roman.address.city).eql('Rome');
    should(roman.address.street).eql('Circus maximus');
    should(roman.address.country).eql('IT');
    should(roman.rank).eql(null);
    should(roman.lego('skills.tools.mastered')).eql(undefined);

    roman.noto(['address{city:Milano, street:Strada del Sole, country:Italia}', 'rank:emperor', 'skills.tools.mastered{sword:true, axe:true, spear:false, shield:true}']);
    should(roman.address.city).eql('Milano');
    should(roman.address.street).eql('Strada del Sole');
    should(roman.address.country).eql('Italia');
    should(roman.rank).eql('emperor');
    should(roman.skills).be.instanceOf(Object);
    should(roman.skills.tools).be.instanceOf(Object);
    should(roman.skills.tools.mastered).be.instanceOf(Object);
    should(roman.skills.tools.mastered.sword).eql(true);
    should(roman.skills.tools.mastered.axe).eql(true);
    should(roman.skills.tools.mastered.spear).eql(false);
    should(roman.skills.tools.mastered.shield).eql(true);

    done();
  });
});
